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
 * set of scripts in to compile them.
 * The completed scripts can then be moved into the database at leisure as quickly
 * as possible between compiles. Compiling is given priority because it takes
 * the longest
 */

const chokidar = require('chokidar');

const watcher = chokidar.watch('./academy-lib/{pending,completed}/*', {ignored: /[\/\\]\./});

watcher.on('addDir', (path) => {
});
watcher.on('unlinkDir', (path) => {
});
watcher.on('error', (path) => {
});
