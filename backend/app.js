var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter = require('./routes/student');
var courseRouter = require('./routes/course');
var gradeRouter = require('./routes/grade');
var loginRouter = require('./routes/login');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//SUOJAAMATTOMAT ENDPOINTIT
app.use('/login', loginRouter);

app.use(authenticateToken);
//SUOJATUT ENDPOINTIT
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', studentRouter);
app.use('/course', courseRouter);
app.use('/grade', gradeRouter);
app.use('/login', loginRouter);

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    console.log("token = "+token);
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.MY_TOKEN, (err, user) => {
      console.log(err)

      if (err) return res.sendStatus(403)

      req.user = user

      next()
    })
  }

module.exports = app;
