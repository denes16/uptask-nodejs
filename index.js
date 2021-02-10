require('dotenv').config();
const debug = require('debug')('http');
const express = require('express');
const app = express();
const router = require('./routes');
require('./models');
const cnn = require('./config/db')._instance.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router());
app.listen(3000, () => {
    debug('Listening');
});
