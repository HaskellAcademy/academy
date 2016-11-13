const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://local.haskellacademy.com:9189/');

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
]);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'dist/',
  publicPath: config.output.publicPath,
  hot: true,
  proxy: {
    'local.haskellacademy.com:9189': 'http://local.haskellacademy.com:3000',
    'api.local.haskellacademy.com:9189': 'http://api.local.haskellacademy.com:3000',
  },
  quiet: false,
  noInfo: false,
  stats: {colors: true},
});
server.listen(9189);
