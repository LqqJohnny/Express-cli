var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 导入  路由 router
var index = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session')
var app = express();

// view engine setup  设置 视图文件夹
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');   //  设置 view 模板引擎 为 ejs,也可以设置其他的  如 ： html jade

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('sessionTest'));
app.use(express.static(path.join(__dirname, 'public')));
/**
 *  session 配置
 * 具体配置见 express-session 官网
 */
app.use(session({
  secret: 'sessionTest',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

//  设置 router 可以use多个
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 异常事件 处理函数
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
