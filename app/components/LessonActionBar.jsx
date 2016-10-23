const React = require('react');

const {lessonActionBar} = require('../../scss/components/lessonActionBar.scss');

const LessonActionBar = ({
  submitCode = () => {},
  resetCode = () => {},
}) => (
  <div className={lessonActionBar}>
    <button className='btn btn-primary' onClick={submitCode}>Run &amp; Submit Code</button>
    <button className='btn btn-info pull-right' onClick={resetCode}>Reset Code</button>
  </div>
);

module.exports = LessonActionBar;
