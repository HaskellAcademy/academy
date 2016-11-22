const React = require('react');
const {Link} = require('react-router');
const DocumentTitle = require('react-document-title');

const LoginPage = () => (
  <DocumentTitle title='Login'>
    <div>
      <h1>Login</h1>
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
      <p>
        <Link to='/'>Home</Link>
      </p>
    </div>
  </DocumentTitle>
);

module.exports = LoginPage;
