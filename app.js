var createError = require('http-errors');
var express = require('express');
// var path = require('path');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'yaobin',//加密的字符串，里面内容可以随便写
  resave: true,// 强制保存session,即使它没变化
  saveUninitialized: true, //强制将未初始化的session存储，默认为true
  cookie : {
    maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  }
}))

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

var usersRouter = require('./routes/users');
var articleRouter = require('./routes/article');
var tagRouter = require('./routes/tag');
app.use('/api/user', usersRouter);
app.use('/api/article', articleRouter);
app.use('/api/tag', tagRouter);


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
  res.json({code:0, err: err})
  res.render('error');
});

module.exports = app;
