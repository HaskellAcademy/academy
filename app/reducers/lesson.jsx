const {createReducer} = require('./reducer');

const Lesson = require('../models/lesson');

const {
  ACTION_UPDATE_FILE,
  ACTION_UPDATE_LESSON,
  ACTION_RESET_CODE,
} = require('../actions/LessonActions');

module.exports = createReducer(new Lesson(), {
  [ACTION_UPDATE_FILE](state, {name, content}) {
    return state.update('files', (files) => (
      files.map((file) => {
        if (file.name === name) {
          const original = file.original ? file.original : file.content;
          return {name, content, original};
        }
        return file;
      })
    ));
  },

  [ACTION_RESET_CODE](state) {
    return state.update('files', (files) => (
      files.map((file) => {
        const original = file.original ? file.original : file.content;
        return {
          name: file.name,
          content: original,
          original: original,
        };
      })
    ));
  },

  [ACTION_UPDATE_LESSON](state, {lesson}) {
    return lesson;
  },
});
