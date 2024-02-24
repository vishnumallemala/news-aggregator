const express = require('express');
const news = require('./src/routes/news');
const users = require('./src/routes/users');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', users);
app.use('/news', news);

app.listen(port, (err) => {
  if (err) {
    return console.log('Something bad happened', err);
  }
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
