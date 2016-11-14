const React = require('react');
const {Link} = require('react-router');

const Home = () => (
  <div>
    <h1>Hello, World!</h1>
    <p>
      <a className='btn btn-primary' href='http://api.local.haskellacademy.com:3000/auth/github'>
        Login with GitHub
      </a>
      &nbsp;
      <a className='btn btn-primary' href='http://api.local.haskellacademy.com:3000/auth/google'>
        Login with Google
      </a>
      &nbsp;
      <a className='btn btn-primary' href='http://api.local.haskellacademy.com:3000/auth/twitter'>
        Login with Twitter
      </a>
    </p>
    <Link to='/lesson/1'>Lesson</Link>
  </div>
);

module.exports = Home;
