const express = require('express');

const app = express();
const mongoose = require('mongoose');
const Card = require('./models/card');
const route = require('./routes/users');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const port = 3000;

app.use('/', route);
app.listen(port);
