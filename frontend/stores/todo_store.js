var _todos = {};
var _callbacks = [];

var TodoStore = {
  changed: function() {
    for(var i = 0; i < _callbacks.length; i++){
      _callbacks[i]();
    }
  },

  addChangedHandler: function(cb) {
    _callbacks.push(cb);
  },

  removeChangedHandler: function(cb) {
    _callbacks.forEach(function(callback, idx){
      if(cb === callback){
        _callbacks.splice(idx, 1);
      }
    });
  },

  all: function() {
    return _todos;
  },

  fetch: function() {
    var store = this;

    $.ajax({
      type: 'GET',
      url: '/api/todos',
      success: function(todos) {
        todos.forEach(function(el) {
          _todos[el.id] = el;
        });
        store.changed();
      }
    });
  },

  create: function(todo) {
    var store = this;

    $.ajax({
      type: 'POST',
      url: '/api/todos',
      data: {todo: todo},
      success: function(createdObj) {
        _todos[createdObj.id] = createdObj;
        store.changed();
      }
    });
  },

  destroy: function(todoId) {
    if (!_todos[todoId]){
      return;
    }
    var store = this;
    $.ajax({
      type: 'DELETE',
      url: '/api/todos/' + todoId,
      success: function() {
        delete _todos[todoId];
        store.changed();
      }
    });
  },

  toggleDone: function(id) {
    var currentDone = _todos[id].done;

    var store = this;

    $.ajax({
      type: 'PATCH',
      url: '/api/todos/' + id,
      data: {todo: { done: !currentDone }},
      success: function() {
        _todos[id].done = !currentDone;
        store.changed();
        console.log(currentDone);
      }
    });
  }

};

module.exports = TodoStore;
