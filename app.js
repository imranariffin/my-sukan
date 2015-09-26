var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var sessions = require('client-sessions');

// custom functions
var configureSessions = require('./functions/configure-sessions');
var setupPassport = require('./functions/setup-passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var secure = require('./routes/secure');

var app = express();

// // connect to mongoDB
// var MONGO_URI = require('./auth/mongo');

// heroku push
var MONGO_URI = 'mongodb://heroku_g5mt3vlr:t2vd6lr3ua0gkb13hll8cebbp5@ds041583.mongolab.com:41583/heroku_g5mt3vlr';

mongoose.connect(MONGO_URI, function (err) {
  if (!err)
    console.log('MONGO CONNECT SUCCESS');
  else
    console.log(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// setup passport
configureSessions(app, sessions);
setupPassport(app, passport);

// main routes
app.use('/', routes);
app.use('/users', users);
app.use('/admin', 
  secure.requireAdmin,
  admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
