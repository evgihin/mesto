const express = require('express');
const User = require('../models/user');

const router = express.Router();

let users;
let allUsers;
let byId;

router.post('/users', (req, res) => {
  users = User({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  });
  users.save();
  res.send(req.body);
  res.end();
});

router.get('/users', (req, res) => {
  User.find({ }).select('name about avatar -_id').exec(function (err, User) {
    allUsers = User;
  });
  res.send(allUsers);
});

router.get('/users/:userId', (req, res) => {
  User.findById(req.params.userId).select('name about avatar').exec(function (err, User){
    byId = User;
  });
  res.send(byId);
});
module.exports = router;
