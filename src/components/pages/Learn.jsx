const React = require('react');

const Navbar = require('../Navbar');
const Lesson = require('../Lesson');
const Editor = require('../Editor');
const LessonActions = require('../LessonActions');

const sample = `\
main = print result
    where result = 2 + 3
`;

const Learn = () => (
  <div>
    <Navbar />
    <Lesson />
    <Editor defaultValue={sample} />
    <LessonActions />
  </div>
);

module.exports = Learn;
