var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var TestRouter = require('./routes/test');  // 이 줄이 올바른지 확인

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Setting up routes');  // 이 줄을 추가
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/member', TestRouter);  // 이 줄이 올바른지 확인

module.exports = app;