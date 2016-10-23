const {connect} = require('react-redux');

const {fetchLesson} = require('../actions/LessonActions');
const LessonPage = require('../components/pages/Lesson');

const mapStateToProps = ({page: {lesson: {title}}}, {params: {id}}) => ({
  id,
  title,
});

const mapDispatchToProps = (dispatch) => ({
  fetch(id) {
    dispatch(fetchLesson(id));
  },
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonPage);
