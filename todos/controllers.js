const { Todo } = require('enmapi/database');

const { sendUserError, throwError } = require('enmapi/common/errors');
const { requireFields } = require('enmapi/common/validation');

module.exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    sendUserError(error, res);
  }
};

module.exports.addTodo = async (req, res) => {
  try {
    const { title, body } = req.body;
    requireFields({ title, body });
    const todo = await new Todo({ title, body }).save();
    res.json(todo);
  } catch (error) {
    sendUserError(error, res);
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const { _id, title, body, status } = req.body;
    const todo = await Todo.findOneAndUpdate({ _id }, { title, body, status });
    res.json(todo);
  } catch (error) {
    sendUserError(error, res);
  }
};

module.exports.removeTodo = async (req, res) => {
  try {
    const { _id } = req.body;
    await Todo.findOneAndRemove({ _id });
    res.json(_id);
  } catch (error) {
    sendUserError(error, res);
  }
};
