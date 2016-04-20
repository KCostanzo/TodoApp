var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var DoneButton = require('./done_button.jsx');

var TodoListItem = React.createClass({

  handleDelete: function(e) {
    TodoStore.destroy(e.currentTarget.id);
  },

  render: function() {
    return (
      <div>
        <div>
          <b>{this.props.todo.title}</b>
        </div>
        <div>
          {this.props.todo.body}
        </div>

        <button id={this.props.todo.id} onClick={this.handleDelete}>Delete Todo Thing</button>
        <DoneButton id={this.props.todo.id} done={this.props.todo.done} />
      </div>
    );
  }

});


module.exports = TodoListItem;
