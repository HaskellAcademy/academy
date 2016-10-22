const React = require('react');
const {fromTextArea} = require('codemirror');

/**
* Uncontrolled CodeMirror component for use with Redux
*/
const CodeMirror = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
    options: React.PropTypes.object,
  },

  componentDidMount() {
    // This setTimeout is required because the browser hasn't finished
    // the layout and the textarea provided by React is not the correct width
    // yet.
    // This line is where the trouble happens in codemirror:
    // https://github.com/codemirror/CodeMirror/blob/6992c534ad33ce60e7500fe04a99a481ef8f548e/src/display/line_numbers.js#L43
    // Not sure what the right solution is.
    setTimeout(() => {
      this._codeMirror = fromTextArea(this._textarea, this.props.options);
      // might want to bind to events here later if that ever becomes a requirement
      this._codeMirror.setValue(this.props.defaultValue || '');
      this._codeMirror.setSize(null, '100%');
    }, 1);
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

  getValue() {
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
