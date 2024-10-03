var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const userRouter = require('./routes/admin/user');
const newsRouter = require('./routes/admin/news');
const productRouter = require('./routes/admin/product');
const WebNewsRouter= require('./routes/web/webNews');
const WebProductRouter= require('./routes/web/webProduct');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const JWT = require('./util/index');
// token验证
app.use((req, res, next) => {
  if (req.url === '/user/login'||req.url.startsWith('/webnews')||req.url.startsWith('/webproduct')) {
    next();
    return;
  } else {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      if (JWT.verify(token)) {
        // 生成新的token,从新计时
        const newToken = JWT.generate({
          id: JWT.verify(token).id,
          username: JWT.verify(token).username
        }, '1d');
        res.header('authorization', newToken);
        next();
      } else {
        res.send({
          code: '-1',
          message: 'loseToken'
        })
      }
    }
  }

})

app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/product', productRouter);
app.use('/webnews', WebNewsRouter);
app.use('/webproduct', WebProductRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
