var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const session = require('express-session');
const nodemailer = require('nodemailer');


//var fs = require(‘fs’);
//var multer  = require('multer')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orgsRouter = require('./routes/organizations')
require('dotenv').config()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'secret-unique-code', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true }));


app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', orgsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Image upload setup

//app.use(multer({ dest: ‘/talentimages/’,
// rename: function (fieldname, filename) {
//   return filename;
// },
//}));
//
//app.post(‘/api/photo’,function(req,res){
// var newItem = new Item();
// newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
// newItem.img.contentType = ‘image/png’;
// newItem.save();
//});

// Database setup
const mongoose = require('mongoose').set('debug', true);
const mongoURI = 'mongodb://rghosh2008:Rghosh2012@ds243501.mlab.com:43501/luckybreak';

mongoose.connect(mongoURI)
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
