const Resource = require('koa-resource-router');

module.exports = new Resource('lessons', {
  // GET /lessons
  // Returns a summary of all the lessons for use in the syllabus
  index: function *() {
    //TODO: Make sure one of the fields is the lesson status
  },
  // GET /lessons/new
  new: function *() {
  },
  // POST /lessons
  create: function *() {
  },
  // GET /lessons/:id
  show: function *() {
    //TODO: Disallow getting unpublished or deleted lessons
    this.body = {
      id: 1,
      title: 'Diving In',
      lesson: '<p>Let\'s dive into some simple Haskell code. Don\'t worry if you do not understand exactly what is happening just yet.</p><p>The code editor on the right is a simple piece of Haskell code that outputs the value of <code>result</code>.</p>',
      instructions: '<p>Modify the expression after <code>result =</code> to be any math expression. You can use many different operators including <code>+</code>, <code>-</code>, <code>*</code> or <code>/</code>. Try to use integers.</p><p>Click <strong>Run &amp; Submit Code</strong> to see the result.</p><p><strong>Tip:</strong> If you mess up, click "Reset Code" to return the code to where it started.</p>',
      files: [
        {
          name: 'Main.hs',
          content: 'main = print result\n    where result = 2 + 3\n',
        },
      ],
    };
  },
  // GET /lessons/:id/edit
  edit: function *() {
  },
  // PUT /lessons/:id
  update: function *() {
  },
  // DELETE /lessons/:id
  destroy: function *() {
  },
});
