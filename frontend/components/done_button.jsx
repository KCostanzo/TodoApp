var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var DoneButton = React.createClass({
  handleDone: function() {
    TodoStore.toggleDone(this.props.id);
  },

  render: function() {
    var buttonText = this.props.done ? 'undo' : 'done';

    return (
      <button onClick={this.handleDone}>{buttonText}</button>
    );
  }
});

module.exports = DoneButton;
