var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');
//日志模块
var log4js = require('log4js');
log4js.configure({
    appenders: [
        { type: 'console' }, //控制台输出
        {
            type: 'file', //文件输出
            filename: 'logs/access.log',
            maxLogSize: 1024,
            backups:3,
            category: 'normal'
        }
    ]
});
var index = require('./controller/index');
var login = require('./controller/login');
var jobs=require("./controller/jobs");
var company=require("./controller/company");
var resume=require("./controller/resume");
var thirdParty=require("./controller/thirdParty");
var loginout=require('./controller/loginout');
var cityData=require('./controller/getCitys');
var jobDetail=require("./controller/getJobDetail");
var companyDetail=require("./controller/getCompanyDetail");
var uploadImage=require("./controller/uploadImage");


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
//日志
var logger = log4js.getLogger('normal');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login);
app.use('/jobs',jobs);
app.use('/company',company);
app.use('/resume',resume);
app.use('/thirdParty',thirdParty);
app.use('/loginout',loginout);
app.use('/getCities',cityData);
app.use("/getJobDetail",jobDetail);
app.use("/getCompanyDetail",companyDetail);
app.use("/uploadImage",uploadImage);
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
