const React = require('react');
const {Link} = require('react-router');

const {navbar, logo} = require('../../scss/components/navbar.scss');

const Navbar = () => (
  <div className={navbar}>
    <div className='col-xs-offset-4 col-xs-4'>
      <Link className={logo} to='/' />
    </div>
  </div>
);

module.exports = Navbar;
