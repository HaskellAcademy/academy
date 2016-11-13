const koa = require('koa');
const host = require('koa-mount-hostname');

const config = require('../config/config');

const api = require('./api');
const webApp = require('./web');

const app = koa();

app.use(host(config.api.hostname, api));
app.use(host(config.app.hostname, webApp));

console.info(`Serving web app at: ${config.app.host}`);
console.info(`Serving api at: ${config.api.host}`);

app.listen(config.app.port);

if (config.api.port !== config.app.port) {
  app.listen(config.api.port);
}
