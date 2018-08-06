const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const shortid = require('short-id');
const imgurUploader = require('imgur-uploader');
const methodOverride = require('method-override')



var Upload = require('s3-uploader');
var fs = require('fs');
var multer = require('multer');
var cloudinary = require('cloudinary');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var orgsRouter = require('./routes/organizations')
require('dotenv').config()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(session({ secret: 'secret-unique-code', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true }));

// Image upload setup organization
app.use(multer({ dest: './public/organizationimages/',
 rename: function (fieldname, filename) {
   return filename;
 },
}).single('logo'));


//app.use(multer({ dest: './public/talentimages/',
// rename: function (fieldname, filename) {
//   return filename;
// },
//}).array('talentphotos',10));


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

// Database setup
const mongoose = require('mongoose').set('debug', true);
const mongoURI = 'mongodb://rghosh2008:Rghosh2012@ds243501.mlab.com:43501/luckybreak';

mongoose.connect(mongoURI)
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app;
