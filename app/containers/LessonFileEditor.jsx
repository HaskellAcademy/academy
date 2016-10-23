const {connect} = require('react-redux');

const {updateFile} = require('../actions/LessonActions');
const Editor = require('../components/Editor');

const mapStateToProps = ({page: {lesson: {files}}}) => ({
  files,
});

const mapDispatchToProps = (dispatch) => ({
  onFileUpdate(name, content) {
    dispatch(updateFile(name, content));
  },
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor);
