const React = require('react');
const {Link} = require('react-router');
const DocumentTitle = require('react-document-title');

const Navbar = require('../Navbar');

const LessonPage = () => (
  <DocumentTitle title='Lessons Overview'>
    <div>
      <Navbar />

      <br /><br /><br /><br />
      <h1>Lessons</h1>
      <p>
        <Link to='/lessons/1'>Lesson</Link>
      </p>
    </div>
  </DocumentTitle>
);

module.exports = LessonPage;
