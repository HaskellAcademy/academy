const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');
const compress = require('koa-compress');
const responseTime = require('koa-response-time');
const cors = require('koa-cors');
const send = require('koa-send');
const zlib = require('zlib');

const app = koa();

app.use(logger());

app.use(responseTime());

app.use(cors());

app.use(limit({
  duration: 3 * 60 * 1000,
  max: 100,
  blacklist: ['127.0.0.1'],
}));

app.use(compress({
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(function *serveStatic() {
  /* eslint no-invalid-this: off */
  if (this.path === '/bundle.js') {
    yield send(this, 'dist/bundle.js');
  }
  else {
    yield send(this, 'dist/index.html');
  }
});

module.exports = app;
