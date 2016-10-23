const {createResourceClient} = require('./api');

const Lesson = require('../models/lesson');

const lessonApi = createResourceClient('/lessons', Lesson);

module.exports = lessonApi;
