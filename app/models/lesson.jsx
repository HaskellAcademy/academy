const {createRecord} = require('./model');

const LessonRecord = createRecord({
}, () => ({
  id: undefined,
  title: undefined,
  summary: undefined,
  body: undefined,
  instructions: undefined,
  // [{name: 'filename', content: 'file contents'}]
  files: [],
}));

class Lesson extends LessonRecord {
}

module.exports = Lesson;
