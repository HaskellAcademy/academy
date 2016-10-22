const Resource = require('koa-resource-router');

module.exports = new Resource('users', {
  // GET /users
  index: function *() {
  },
  // GET /users/new
  new: function *() {
  },
  // POST /users
  create: function *() {
  },
  // GET /users/:id
  show: function *() {
    this.body = {
      id: 1,
      name: 'Sunjay Varma',
      email: 'varma.sunjay@gmail.com',
      picture: {
        32: 'http://placehold.it/32',
      },
    };
  },
  // GET /users/:id/edit
  edit: function *() {
  },
  // PUT /users/:id
  update: function *() {
  },
  // DELETE /users/:id
  destroy: function *() {
  },
});
