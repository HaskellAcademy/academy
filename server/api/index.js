const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const cors = require('koa-cors');
const session = require('koa-generic-session');
const bodyParser = require('koa-bodyparser');
const zlib = require('zlib');

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
  // allow cookies to be passed cross-origin
  credentials: true,
}));

app.use(limit({
  duration: 3 * 60 * 1000,
  max: 100,
  blacklist: ['127.0.0.1'],
}));

app.use(compress({
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(session({
  // cookie name
  key: 'ha:sess',
  cookie: {
    domain: `.${config.app.hostname}`,
    maxage: 365 * 24 * 60 * 60 * 1000, // one year in ms,
  },
}));

app.use(bodyParser());

auth.setup(app);

for (const resource of resources) {
  app.use(resource.middleware());
}

module.exports = app;
