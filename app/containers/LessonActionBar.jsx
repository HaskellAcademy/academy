const {connect} = require('react-redux');

const {resetCode} = require('../actions/LessonActions');
const LessonActionBar = require('../components/LessonActionBar');

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  submitCode() {
    //TODO
  },

  resetCode() {
    dispatch(resetCode());
  },
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonActionBar);
