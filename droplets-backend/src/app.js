const express = require('express');
const cors = require('cors');
require('dotenv').config();

if (!process.env.AUTOMATED_TEST) {
  require('./db/mongoose');
}
const app = express();
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-Auth, admin, Authorization',
  );
  next();
});

app.use(express.json());

app.use('/', require('./routes/'));
app.use('/vaults', require('./routes/vaults'));

module.exports = app;
