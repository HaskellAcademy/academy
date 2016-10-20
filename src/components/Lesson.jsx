const React = require('react');

const {lesson, instructions, instructionsTitle} = require('../../scss/components/lesson.scss');

const Lesson = () => (
  <div className={lesson}>
    <h1>Diving In</h1>
    <p>Let's dive into some simple Haskell code. Don't worry if
      you do not understand exactly what is happening just yet.</p>
    <p>The code editor on the right is a simple piece
      of Haskell code that outputs the value of <code>result</code>.</p>

    <div className={instructions}>
      <h2 className={instructionsTitle}>Instructions</h2>
      <p>Modify the expression after <code>result =</code> to
        be any math expression. You can use many different
        operators including <code>+</code>, <code>-</code>, <code>*</code> or <code>/</code>. Try to use integers.</p>
      <p>Click <strong>Run &amp; Submit Code</strong> to see the result.</p>

      <p><strong>Tip:</strong> If you mess up, click "Reset Code" to return
        the code to where it started.</p>
    </div>
  </div>
);

module.exports = Lesson;
