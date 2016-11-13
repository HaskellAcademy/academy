const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const configPath = require('./config/resolve');

module.exports = {
  entry: ['./app/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?modules&importLoaders=1&sourceMap!postcss!sass?sourceMap&sourceMapContents'],
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'json-loader',
      },
      {test: /\.(png|svg)$/, loader: 'url-loader?limit=100000'},
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'index.html'},
    ]),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'academy-config': configPath,
    },
  },
  devtool: 'inline-source-map',
  postcss: [autoprefixer],
};
