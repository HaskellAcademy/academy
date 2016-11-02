/**
 * This script is responsible for taking pending submissions from the
 * academy-lib/pending folder, move them into the submission folder,
 * compile them, and then move the compiled result into the completed folder
 * with the same ID.
 *
 * Pending submissions are stored in the pending folder under a subfolder
 * with the ID of the submission.
 * So a pending submission with a few files might look like this:
 *    academy-lib/pending/476ae62f759f4ced8378c645c5332679/Main.hs
 *    academy-lib/pending/476ae62f759f4ced8378c645c5332679/Other.hs
 *
 * This script will move the files only (not the ID directory) into the submission
 * folder. That submission is then compiled. The resulting JavaScript file is moved
 * into the completed folder in a folder with the same ID as before.
 *
 * A completed compilation might look like this:
 *    academy-lib/completed/476ae62f759f4ced8378c645c5332679/output.js
 *
 * Once the compiled script is moved into completed, this script will move the next
 * set of scripts in to the submission folder to compile them.
 * The completed scripts can then be moved into the database at leisure
 * while this script continues to compile. Compiling is given priority because
 * it takes the longest. This script runs in the same space as the compiler
 * so it has no network or database access. Another process must manage the
 * completed folder and write the results to whereever they need to go after
 * compilation.
 *
 * If an error occurs, it is written to error.txt instead of output.js
 */

const {basename} = require('path');

const chokidar = require('chokidar');
const bunyan = require('bunyan');
const throttle = require('lodash.throttle');

const log = bunyan.createLogger({name: 'haskell-compiler'});
const watcher = chokidar.watch('./academy-lib/pending/*', {ignored: /[\/\\]\./});

// List of IDs
const pending = [];

watcher.on('addDir', (path) => {
  const id = basename(path);
  pending.push(id);
  log.info(`Task with id '${id}' is pending`);
});
watcher.on('unlinkDir', (path) => {
  const id = basename(path);
  const index = pending.indexOf(id);
  if (index > -1) {
    pending.splice(index, 1);
  }
});
watcher.on('error', (error) => {
  log.error(error);
});

const flushCompletions = throttle(() => {
}, 300);
