var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var bills = require('./routes/bills')
var addBill = require('./routes/addBill')
var deleteBill = require('./routes/deleteBill')
var app = express();
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://ravenstudios.ddns.net:27017/test";




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = MongoClient;
    req.dbURL = url;
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/bills', bills);
app.use('/addBill', addBill);
app.use('/deleteBill', deleteBill);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
