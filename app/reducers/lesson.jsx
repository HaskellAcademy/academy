const {createReducer} = require('./reducer');

const Lesson = require('../models/lesson');

const {
  ACTION_UPDATE_FILE,
  ACTION_UPDATE_LESSON,
} = require('../actions/LessonActions');

module.exports = createReducer(new Lesson(), {
  [ACTION_UPDATE_FILE](state, {name, content}) {
    return state.update('files', (files) => (
      files.map((file) => {
        if (file.name === name) {
          return {name, content};
        }
        return file;
      })
    ));
  },
  [ACTION_UPDATE_LESSON](state, {lesson}) {
    return lesson;
  },
});
