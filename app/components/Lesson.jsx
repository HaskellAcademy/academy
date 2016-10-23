const React = require('react');

const {
  lesson,
  instructions: instructionsContainer,
  instructionsTitle,
} = require('../../scss/components/lesson.scss');

const Lesson = ({title, body, instructions}) => (
    <div className={lesson}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{__html: body}} />

      <div className={instructionsContainer}>
        <h2 className={instructionsTitle}>Instructions</h2>
        <div dangerouslySetInnerHTML={{__html: instructions}} />
      </div>
    </div>
);

module.exports = Lesson;
