const React = require('react');
const DocumentTitle = require('react-document-title');

const Navbar = require('../Navbar');
const Lesson = require('../../containers/Lesson');
const LessonFileEditor = require('../../containers/LessonFileEditor');
const OutputWindow = require('../OutputWindow');
const LessonActions = require('../LessonActions');

const LessonPage = React.createClass({
  propTypes: {
    id: React.PropTypes.any,
    title: React.PropTypes.string,
    fetch: React.PropTypes.func.isRequired,
  },

  componentDidMount() {
    this.props.fetch(this.props.id);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('id') && nextProps.id !== this.props.id) {
      this.props.fetch(nextProps.id);
    }
  },

  render() {
    const {title} = this.props;
    return (
      <DocumentTitle title={title || 'Lesson'}>
        <div>
          <Navbar />
          <Lesson />
          <LessonFileEditor />
          <OutputWindow />
          <LessonActions />
        </div>
      </DocumentTitle>
    );
  },
});

module.exports = LessonPage;
