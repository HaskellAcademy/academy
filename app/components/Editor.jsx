const React = require('react');
const classNames = require('classnames');

const CodeMirror = require('./CodeMirror');
// some codemirror CSS is required in index.scss
require('codemirror/mode/haskell/haskell');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/closebrackets');

const {
  editor,
  editorTabs,
  editorTab,
  activeTab,
  editorContent,
} = require('../../scss/components/editor.scss');

const Editor = React.createClass({
  propTypes: {
    files: React.PropTypes.array,
    onFileUpdate: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      files: [],
      onFileUpdate() {},
    };
  },

  getInitialState() {
    return {
      activeIndex: 0,
    };
  },

  onTabChange(index) {
    this.setState({activeIndex: index});
  },

  render() {
    const options = {
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      theme: 'monokai',
      mode: 'haskell',
    };

    const {files, onFileUpdate} = this.props;
    const {activeIndex} = this.state;

    const {name, content} = files.length ? files[activeIndex] : {};

    return (
      <div className={editor}>
        <div className={editorTabs}>
          {files.map(({name}, index) => (
            <div key={name} className={classNames({
              [editorTab]: true,
              [activeTab]: index === activeIndex,
            })} onClick={() => this.onTabChange(index)}>
              {name}
            </div>
          ))}
        </div>

        <div className={editorContent}>
          <CodeMirror value={content || ''}
            onChange={(content) => onFileUpdate(name, content)}
            options={options} />
        </div>
      </div>
    );
  },
});

module.exports = Editor;
