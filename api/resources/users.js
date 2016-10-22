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
    this.body = {name: 'Sunjay'};
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
