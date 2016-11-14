const urljoin = require('url-join');

const router = require('koa-router');
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GitHubStrategy = require('passport-github').Strategy;

const config = require('../../../config/config');

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
    done(null, {id: 1});
    //User.findById(id, function(err, user) {
    //  return done(err, user);
    //});
  });

  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/google/callback'),
    },
    function(token, tokenSecret, profile, done) {
      console.log('google auth profile', profile);
      done(null, {id: 1});
      //User.findOrCreate({googleId: profile.id}, function(err, user) {
      //  return done(err, user);
      //});
    }
  ));

  passport.use(new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/twitter/callback'),
    },
    function(token, tokenSecret, profile, done) {
      console.log('twitter auth profile', profile);
      done(null, {id: 1});
      //User.findOrCreate({twitterId: profile.id}, function(err, user) {
      //  return done(err, user);
      //});
    }
  ));

  passport.use(new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: urljoin(config.api.host, '/auth/github/callback'),
    },
    function(accessToken, refreshToken, profile, done) {
      console.log('github auth profile', profile);
      done(null, {id: 1});
      //User.findOrCreate({githubId: profile.id}, function(err, user) {
      //  return done(err, user);
      //});
    }
  ));
}

function setupRouter() {
  const routes = router();

  routes.get('/auth/google',
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
    passport.authenticate('twitter')
  );

  routes.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure',
    })
  );

  routes.get('/auth/github',
    passport.authenticate('github')
  );

  routes.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/failure',
    })
  );

  // Used to force cookies to get set for a specific
  // session. Works because we override the sessionIdStore
  // in koa-generic-session to use a query.sid parameter
  // as the sessionId.
  // We return the user here so the client doesn't need
  // to make another request afterwards to get that
  routes.get('/auth/me', function*() {
    console.log('me', this.sessionId);
    // forces set cookie
    this.sessionSave = true;
    //TODO: Real user based on what is stored in the session
    this.body = {id: 1};
  });

  routes.all('/auth/success', function*() {
    if (!this.sessionId) {
      this.throw(400, 'Your session is invalid');
    }
    this.redirect(urljoin(config.app.host, `/login/finish?sid=${this.sessionId}`));
    this.status = 302;
  });

  routes.all('/auth/failure', function*() {
    //TODO: Attach failure reason
    this.redirect(urljoin(config.app.host, '/login'));
  });

  return routes;
}
