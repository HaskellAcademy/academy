const React = require('react');
const {fromTextArea} = require('codemirror');

/**
* Uncontrolled CodeMirror component for use with Redux
*/
const CodeMirror = React.createClass({
  propTypes: {
    defaultContent: React.PropTypes.string,
    options: React.PropTypes.object,
  },

  componentDidMount() {
    this._codeMirror = fromTextArea(this._textarea, this.props.options);
    // might want to bind to events here later if that ever becomes a requirement
    this._codeMirror.setValue(this.props.defaultValue || '');
  },

  componentWillUnmount() {
    if (this._codeMirror) {
      this._codeMirror.toTextArea();
    }
  },

  focus() {
    if (this._codeMirror) {
      this._codeMirror.focus();
    }
  },

  getContent() {
    if (this._codeMirror) {
      return this._codeMirror.getValue();
    }
    return null;
  },

  render() {
    return (
      <textarea ref={(node) => this._textarea = node} />
    );
  },
});

module.exports = CodeMirror;
