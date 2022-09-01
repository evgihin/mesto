const express = require('express');

const app = express();
const mongoose = require('mongoose');
const users = require('./routes/users');
const cards = require('./routes/cards');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const port = 3000;
app.use('/', cards, users);
app.listen(port);
