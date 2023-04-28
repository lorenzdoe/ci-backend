/*
 * Importing necessary modules
*/
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// router
var todosRouter = require('./routes/todos');
var loginRouter = require('./routes/sessions');
var userRouter = require('./routes/users');

// for protected routes
const authenticate = require('./middlewares/auth');

// create an instance of express
var app = express();
// add CORS middleware to allow cross-origin requests
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mount router to routes
app.use('/todos', authenticate, todosRouter);
app.use('/sessions', loginRouter);     // handles login
app.use('/users', userRouter);         // handles registration

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  next(createError(err.status || 500));
});

module.exports = app;
