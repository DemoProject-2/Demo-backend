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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/connections', connectionsRouter);
app.use('/notes', [authorize], notesRouter);

module.exports = app;
