var React = require('react');
var TodoStore = require('../stores/todo_store.js');
var TodoListItem = require('./todo_list_item.jsx');
var TodoForm = require('./todo_form.jsx');

var TodoList = React.createClass({
  getInitialState: function() {
    return { todos: TodoStore.all() };
  },

  render: function() {
    var self = this;
    var todoKeys = Object.keys(this.state.todos);
    var todos = todoKeys.map(function(todoKey){
      var todo = self.state.todos[todoKey];
      return <TodoListItem key={todo.id} todo={todo}/>;
    });

    return (
      <div>
        {todos}
        <TodoForm/>
      </div>
    );
  },

  todosChanged: function() {
    this.setState( { todos: TodoStore.all() } );
  },

  componentDidMount: function() {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangedHandler(this.todosChanged);
  }
});


module.exports = TodoList;
