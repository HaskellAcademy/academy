const React = require('react');

const {lessonActions} = require('../../scss/components/lessonActions.scss');

const LessonActions = () => (
  <div className={lessonActions}>
    <button className='btn btn-primary'>Run &amp; Submit Code</button>
    <button className='btn btn-info pull-right'>Reset Code</button>
  </div>
);

module.exports = LessonActions;
