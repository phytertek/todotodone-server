const {
  getAllTodos,
  addTodo,
  updateTodo,
  removeTodo
} = require('./controllers');

module.exports = {
  '/todos': {
    get: {
      '/all': getAllTodos
    },
    post: {
      '/add': addTodo,
      '/update': updateTodo,
      '/remove': removeTodo
    }
  }
};
