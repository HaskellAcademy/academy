/**
 * Resolves the configuration path
 * WebPack config uses this to setup an alias module
 */

const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configFilename = environment === 'production' ? 'production' : 'development';

const configPath = path.resolve(__dirname, configFilename + '.js');

module.exports = configPath;
