const React = require('react');

const CodeMirror = require('./CodeMirror');
require('codemirror/mode/haskell/haskell');
require('codemirror/addon/edit/matchbrackets');

/**
* Uncontrolled Editor component for use with Redux
*/
const Editor = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },

  getValue() {
    return this.refs.editor.getValue();
  },

  render() {
    var options = {
      matchBrackets: true,
      theme: 'monokai',
      mode: 'haskell',
    };

    return (
      <CodeMirror ref='editor'
        defaultValue={this.props.defaultValue}
        options={options} />
    );
  },
});

module.exports = Editor;
