const React = require('react');
const throttle = require('lodash.throttle');
const {fromTextArea} = require('codemirror');

/**
* Controlled CodeMirror component for use with Redux
* Automatically throttles onChange calls to every few seconds
*/
const CodeMirror = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
    options: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      onChange() {},
    };
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value') && nextProps.value !== this.getValue()) {
      this._codeMirror.setValue(nextProps.value);
    }

    if (typeof nextProps.options === 'object') {
      for (const key of Object.keys(nextProps.options)) {
        this._codeMirror.setOption(key, nextProps.options[key]);
      }
    }
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
      this._codeMirror.on('change', throttle(this.valueChanged, 1000));

      this._codeMirror.setValue(this.props.value || '');
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

  valueChanged(doc, change) {
    if (this.props.onChange && change.origin !== 'setValue') {
      this.props.onChange(doc.getValue());
    }
  },

  render() {
    return (
      <textarea ref={(node) => this._textarea = node} />
    );
  },
});

module.exports = CodeMirror;
