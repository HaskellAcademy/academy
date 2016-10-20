const React = require('react');

const {navbar, logo} = require('../../scss/components/navbar.scss');

const Navbar = () => (
  <div className={navbar}>
    <div className='col-xs-offset-4 col-xs-4'>
      <div className={logo} />
    </div>
  </div>
);

module.exports = Navbar;
