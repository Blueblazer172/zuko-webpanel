const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

const apiRouter = require('./routes/index');

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api', apiRouter);

// @TODO add error handling

module.exports = app;
