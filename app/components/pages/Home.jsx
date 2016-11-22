const React = require('react');
const {Link} = require('react-router');

const Home = () => (
  <div>
    <h1>Hello, World!</h1>
    <p>
      <Link to='/login' className='btn btn-success'>Login</Link>
    </p>
    <p>
      <Link to='/lessons'>Lessons</Link>
    </p>
    <p>
      <a href='http://api.local.haskellacademy.com:3000/auth/logout'>Logout</a>
    </p>
  </div>
);

module.exports = Home;
