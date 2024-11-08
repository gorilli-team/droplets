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

// Middleware to log API requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Log the request method and URL
  next(); // Call the next middleware or route handler
});

app.use('/', require('./routes/'));
app.use('/vaults', require('./routes/vaults'));

module.exports = app;
