const {connect} = require('react-redux');

const Lesson = require('../components/Lesson');

const mapStateToProps = ({page: {lesson}}) => lesson.toJSON();

const mapDispatchToProps = (dispatch) => ({
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
