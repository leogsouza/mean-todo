var express = require('express');
var app = express();
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser');  // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration
mongoose.connect('mongodb://localhost/mytodo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Todo = mongoose.model('Todo', {
  text: String
});

// get all todos
app.get('/api/todos', function (req, res) {

  // Use the mongoose to get all todos in the database
  Todo.find(function (err, todos) {

    // if there is an error retrieving, send the error, nothing after res.send(error) will execute
    if (err)
      res.send(err);

    res.json(todos); // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function (req, res) {

  // create a todo, information comes from AJAX request from angular
  Todo.create({
    text: req.body.text,
    done: false,
  }, function (err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create another
    Todo.find(function (err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });
  });
});

// delete a todo
app.delete('/api/todos/:todo_id', function (req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function (err, todo) {
    if (err)
      res.send(err);

    Todo.find(function (err, todos) {
      if (err)
        res.send(err);

      res.json(todos);
    });
  });
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html'); // load the single view file
});

app.listen(8080);
console.log('App listening on port 8080');
