const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');

const users = require('./resources/users');
const lessons = require('./resources/lessons');

const resources = [
  users,
  lessons,
];

const app = koa();

app.use(responseTime());

app.use(limit({
  duration: 3*60*1000,
  max: 100,
  blacklist: ['127.0.0.1'],
}));

app.use(logger());

app.use(compress({
  flush: require('zlib').Z_SYNC_FLUSH,
}));

for (const resource of resources) {
  app.use(resource.middleware());
}

app.listen(3000);
