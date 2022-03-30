const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const error = require('../middlewares/error');

const app = express();

const router = require('../routes');

app.use(bodyParser.json());

app.use(cors());

app.use(router);

app.use(error);

module.exports = app;
