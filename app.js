var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var job=require("./routes/job");
var company=require("./routes/company");
var cvData=require("./routes/cvData");
var govAndSch=require("./routes/govAndSch");
var loginout=require('./routes/loginout');
var cityData=require('./routes/getCitys');
var jobDetail=require("./routes/getJobDetail");
var companyDetail=require("./routes/getCompanyDetail");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:"admin",
  resave:false,
  saveUninitialized:true
}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/job',job);
app.use('/company',company);
app.use('/cvData',cvData);
app.use('/govAndSch',govAndSch);
app.use('/loginout',loginout);
app.use('/getCities',cityData);
app.use("/getJobDetail",jobDetail);
app.use("/getCompanyDetail",companyDetail);
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
