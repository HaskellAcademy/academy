const React = require('react');

const CodeMirror = require('./CodeMirror');
require('codemirror/mode/haskell/haskell');
require('codemirror/addon/edit/matchbrackets');

/**
* Uncontrolled Editor component for use with Redux
*/
const Editor = React.createClass({
  propTypes: {
    defaultContent: React.PropTypes.string,
  },

  getContent() {
    return this.refs.editor.getContent();
  },

  render() {
    var options = {
      matchBrackets: true,
      theme: 'monokai',
      mode: 'haskell',
    };

    return (
      <CodeMirror ref='editor'
        defaultContent={this.props.defaultContent}
        options={options} />
    );
  },
});

module.exports = Editor;
