const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Card = require('./models/card');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Mesto!');
});

app.listen(port);
mongoose.connect('mongodb://localhost:27017/mestodb');
