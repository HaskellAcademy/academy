const {createRecord} = require('./model');

const LessonRecord = createRecord({
  STATUS_PUBLISHED: 'published',
  STATUS_DISABLED: 'disabled',
}, (constants) => ({
  id: undefined,
  title: undefined,
  summary: undefined,
  status: constants.STATUS_PUBLISHED,
  body: undefined,
  instructions: undefined,
  // [{name: 'filename', content: 'file contents'}]
  files: [],
}));

class Lesson extends LessonRecord {
}

module.exports = Lesson;
