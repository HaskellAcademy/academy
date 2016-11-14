const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const cors = require('koa-cors');
const session = require('koa-generic-session');
const bodyParser = require('koa-bodyparser');

const config = require('../../config/config');

const auth = require('./auth');

const users = require('./resources/users');
const lessons = require('./resources/lessons');

const resources = [
  lessons,
  users,
];

const app = koa();

app.use(logger());

app.use(responseTime());

app.use(cors({
  // allow any origin while developing
  origin: config.isDev ? true : config.app.host,
}));

app.use(limit({
  duration: 3*60*1000,
  max: 100,
  blacklist: ['127.0.0.1'],
}));

app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH,
}));

// This is mostly copied from koa-generic-session
// We have to do it in this messy way because their
// API really sucks. All we are trying to do here
// is make the sessionIdStore check for a query
// parameter called sid and use that for the sessionId
// if it is available. This allows us to let the client
// set a session id we send them after authentication
const sessionCookieName = 'ha:sess';
const sessionCookie = {
  httpOnly: true,
  path: '/',
  overwrite: true,
  signed: true,
  maxAge: 24 * 60 * 60 * 1000,
};
app.use(session({
  key: sessionCookieName, // cookie name
  sessionIdStore: {
    get() {
      if (this.query.sid) {
        return this.query.sid;
      }
      return this.cookies.get(sessionCookieName, sessionCookie);
    },

    set(sid, session) {
      this.cookies.set(sessionCookieName, sid, session.cookie);
    },

    reset() {
      this.cookies.set(sessionCookieName, null);
    },
  },
}));

app.use(bodyParser());

auth.setup(app);

for (const resource of resources) {
  app.use(resource.middleware());
}

module.exports = app;
