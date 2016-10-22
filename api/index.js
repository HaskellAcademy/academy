const koa = require('koa');
const logger = require('koa-logger');
const limit = require('koa-better-ratelimit');

const app = koa();

app.use(limit({
  duration: 3*60*1000,
  max: 100,
  blacklist: ['127.0.0.1'],
}));

app.use(logger());

app.use(function *() {
  this.body = 'Hello World';
});

app.listen(3000);
