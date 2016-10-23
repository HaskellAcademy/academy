const React = require('react');

const {lessonActionBar} = require('../../scss/components/lessonActionBar.scss');

const LessonActionBar = () => (
  <div className={lessonActionBar}>
    <button className='btn btn-primary'>Run &amp; Submit Code</button>
    <button className='btn btn-info pull-right'>Reset Code</button>
  </div>
);

module.exports = LessonActionBar;
