const React = require('react');

const CodeMirror = require('./CodeMirror');
// some codemirror CSS is required in index.scss
require('codemirror/mode/haskell/haskell');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');

const {editor} = require('../../scss/components/editor.scss');

const Editor = React.createClass({
  propTypes: {
    defaultValue: React.PropTypes.string,
  },

  getValue() {
    return this.refs.editor.getValue();
  },

  render() {
    const options = {
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      theme: 'monokai',
      mode: 'haskell',
    };

    return (
      <div className={editor}>
        <CodeMirror ref='editor'
          defaultValue={this.props.defaultValue}
          options={options} />
      </div>
    );
  },
});

module.exports = Editor;
