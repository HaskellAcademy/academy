const React = require('react');
const {Link} = require('react-router');

const Home = () => (
  <div>
    <h1>Hello, World!</h1>
    <Link to='/lesson/1'>Lesson</Link>
  </div>
);

module.exports = Home;
