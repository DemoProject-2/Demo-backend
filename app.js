const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const { authorize } = require('./middleware/user_auth')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users');
const connectionsRouter = require('./routes/connections');
const notesRouter = require('./routes/notes')
const app = express();
require('socket.io')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/connections', connectionsRouter);
app.use('/notes', [authorize], notesRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chatSocket'); //change to app.js instead of index.html?
});

module.exports = app;
