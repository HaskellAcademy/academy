const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');

config.entry.unshift('webpack/hot/only-dev-server');
config.entry.unshift('webpack-dev-server/client?http://0.0.0.0:9189/');

config.plugins = (config.plugins || []).concat([
  new webpack.HotModuleReplacementPlugin(),
]);

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'dist/',
  publicPath: config.output.publicPath,
  hot: true,
  quiet: false,
  noInfo: false,
  stats: {colors: true},
  historyApiFallback: true,
});
server.listen(9189);
