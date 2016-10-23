const React = require('react');
const {Link} = require('react-router');

const Home = () => (
  <div>
    <h1>Hello, World!</h1>
    <Link to='/lesson'>Lesson</Link>
  </div>
);

module.exports = Home;
