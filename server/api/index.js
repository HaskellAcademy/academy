const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const cors = require('koa-cors');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const config = require('../../config/config');

const auth = require('./auth')();

const users = require('./resources/users');
const lessons = require('./resources/lessons');

const resources = [
  lessons,
  users,
];

const app = koa();
app.keys = [process.env.SESSION_SECRET];

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

app.use(session({
  key: 'ha:sess', // cookie name
}, app));

app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(auth.routes());
app.use(auth.allowedMethods());

for (const resource of resources) {
  app.use(resource.middleware());
}

module.exports = app;
