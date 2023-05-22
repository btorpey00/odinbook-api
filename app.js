require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

const User = require('./models/user');


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(mongoDB);
};
main().catch((err) => console.log(err));

var indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
var usersRouter = require('./routes/users');
const { mainModule } = require('process');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.options('*', cors());

app.use('/', indexRouter);
app.use('/posts', postRouter);
app.use('/users', usersRouter);

module.exports = app;
