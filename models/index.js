const mongoose = require('mongoose');
mongoose.get('debug', true);
mongoose.connect('mongodb://localhost/todo-api');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
