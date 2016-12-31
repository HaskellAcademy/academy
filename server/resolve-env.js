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

    const defs = readEnv(env);

    for (const [name, value] of parseEnv(defs)) {
      process.env[name.trim()] = value.trim();
    }

    console.info(`Successfully loaded environment file: ${env}`);
  }
};

/**
 * Attempts to fetch the environment file synchronously
 */
function readEnv(filename) {
  try {
    /* eslint no-sync: off */
    return fs.readFileSync(filename).toString();
  }
  catch (e) {
    console.error(`Failed to load environment file: ${filename}`);
    return null;
  }
}

/**
 * Parses each line of the environment file
 */
function *parseEnv(contents) {
  for (let line of contents.split('\n')) {
    line = line.trim();
    if (!line || line.startsWith('#')) {
      continue;
    }

    const [name, value] = line.split('=', 2);
    yield [name, value];
  }
}
