const express = require('express');
const logger = require('morgan');
const routes = require('./routes');
const dbConnection = require('./config/db');
const passport = require('passport');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(routes);

dbConnection();

app.use(passport.initialize());

app.listen(PORT, () =>
  console.log(
    `🌎  ==> API Server now listening on PORT http://localhost:${PORT}`
  )
);
