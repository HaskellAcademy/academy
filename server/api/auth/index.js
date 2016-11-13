const urljoin = require('url-join');

const router = require('koa-router');
const passport = require('koa-passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

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
      //TODO: Redirect to something real
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

  routes.get('/auth/twitter',
    passport.authenticate('twitter')
  );

  routes.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      //TODO: Redirect to something real
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );

  return routes;
}
