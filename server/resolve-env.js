/**
 * Sets environment variables from a provided environment file
 *
 * Usage:
 * --env - just providing the option defaults to using .env
 * --env filename - uses the specified file
 *
 * If the filename turns out not to exist, this will print
 * out a message to stderr and allow the program to continue
 * running
 */

const fs = require('fs');

const argv = require('yargs').argv;

module.exports = () => {
  if (argv.env) {
    let env = '.env';
    if (typeof argv.env === 'string') {
      env = argv.env;
    }

    let defs;
    try {
      defs = fs.readFileSync(env).toString();
    }
    catch (e) {
      console.error(`Failed to load environment file: ${env}`);
      return;
    }

    for (let line of defs.split('\n')) {
      line = line.trim();
      if (!line || line.startsWith('#')) {
        continue;
      }

      const [name, value] = line.split('=', 2);
      process.env[name.trim()] = value.trim();
    }

    console.info(`Successfully loaded environment file: ${env}`);
  }
};
