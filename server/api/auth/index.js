const url = require('url');

const urljoin = require('url-join');

const router = require('koa-router');
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const config = require('../../../config/config');

const {User} = require('../db');

exports.setup = function(app) {
  setupPassport();
  app.use(passport.initialize());
  app.use(passport.session());

  const routes = setupRouter();
  app.use(routes.routes());
  app.use(routes.allowedMethods());
};

function setupPassport() {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then((user) => done(null, user))
      .catch((error) => done(error, null));
  });

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/google/callback'),
    },
    fetchOrCreateUser('googleId')
  ));

  passport.use(new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/twitter/callback'),
      includeEmail: true,
    },
    fetchOrCreateUser('twitterId')
  ));

  passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/github/callback'),
      scope: 'user:email',
    },
    fetchOrCreateUser('githubId')
  ));

  function fetchOrCreateUser(key) {
    return (token, tokenSecret, profile, done) => {
      const email = profile.emails.reduce((acc, email) => {
        if (email.primary || !acc) {
          return email.value;
        }
        return acc;
      }, null);

      User.findOrCreate({
        where: {
          $or: [
            {[key]: profile.id},
            {email: email},
          ],
        },
      }).spread((user, created) => {
        if (created) {
          // need to populate with profile info only if created
          user.update({
            name: profile.displayName,
            email: email,
            lastLogin: new Date(),
            isActive: true,
            [key]: profile.id,
          }).then(() => done(null, user));
        }
        else {
          user.update({
            lastLogin: new Date(),
            [key]: profile.id,
          }).then(() => done(null, user));
        }
      });
    };
  }
}

function setupRouter() {
  const routes = router();

  routes.get('/auth/google',
    saveRedirect,
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  routes.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure',
    })
  );

  routes.get('/auth/twitter',
    saveRedirect,
    passport.authenticate('twitter')
  );

  routes.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure',
    })
  );

  routes.get('/auth/github',
    saveRedirect,
    passport.authenticate('github')
  );

  routes.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure',
    })
  );

  routes.get('/auth/logout', saveRedirect, function*() {
    this.logout();
    this.redirect('/');

    const origin = this.session.loginOrigin || config.app.host;

    this.redirect(urljoin(origin, '/login'));
    this.session.loginOrigin = null;
    this.session.afterLogin = null;
  });

  routes.get('/auth/me', function*() {
    this.body = this.req.user;
  });

  routes.all('/auth/success', function*() {
    const next = this.session.afterLogin || '/';
    const origin = this.session.loginOrigin || config.app.host;

    this.redirect(urljoin(origin, next));
    this.session.loginOrigin = null;
    this.session.afterLogin = null;
    this.status = 302;
  });

  routes.all('/auth/failure', function*() {
    const origin = this.session.loginOrigin || config.app.host;

    //TODO: Attach failure reason
    this.redirect(urljoin(origin, '/login?error=failed'));
    this.session.loginOrigin = null;
    this.session.afterLogin = null;
  });

  return routes;
}

function* saveRedirect(next) {
  const parsed = url.parse(this.headers.referer);
  parsed.pathname = parsed.path = '';
  this.session.loginOrigin = url.format(parsed);
  if (this.query.next) {
    this.session.afterLogin = this.query.next;
  }
  else {
    this.session.afterLogin = null;
  }
  yield next;
}
