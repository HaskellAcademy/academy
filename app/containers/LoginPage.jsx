const {connect} = require('react-redux');

const Login = require('../components/pages/Login');

const mapStateToProps = ({routing: {locationBeforeTransitions: {query}}}) => ({
  error: query.error || null,
});

module.exports = connect(
  mapStateToProps
)(Login);
