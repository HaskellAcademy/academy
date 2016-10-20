const React = require('react');

const Navbar = require('../Navbar');
const Lesson = require('../Lesson');
const Editor = require('../Editor');
const LessonActions = require('../LessonActions');

const Learn = () => (
  <div>
    <Navbar />
    <Lesson />
    <Editor />
    <LessonActions />
  </div>
);

module.exports = Learn;
