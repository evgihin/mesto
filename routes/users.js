const mongoose = require('mongoose');
const express = require('express');
const User = require('../models/user');

const router = express.Router();

let users;
let allUsers;
let byId;
let result;
let errors;

router.post('/users', async (req, res, next) => {
  users = User({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  });
  try {
    await users.save();
  } catch (err) {
    res.status(400).send('Некоректные данные');
    next(err);
  }
  res.end();
});

router.get('/users', (req, res) => {
  User.find({ }).select('name about avatar -_id').exec(function (err, User) {
    allUsers = User;
  });
  res.send(allUsers);
});

router.get('/users/:userId', async (req, res, next) => {
  User.findById(req.params.userId).select('name about avatar').exec((err, User) =>{
    if (!User) {
      if (err) {
        res.status(400).send('Некоректные данные');
        next(err);
      } else {
        res.status(404).send('Пользователь не найден');
        try {
          throw new Error('User not found');
        } catch (error) {
          next(error);
        }
      }
    } else {
      res.send(User);
    }
  });
});
router.patch('/users/me', (req, res, next) => {
  const options = { runValidators: true };
  const condition = { name: req.body.find };
  const update = {
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
  };
  User.findOneAndUpdate(condition, update, options).exec((err, User) => {
    if (!User) {
      if (err) {
        res.status(400).send('Некоректные данные');
        next(err);
      } else {
        res.status(404).send('Пользователь не найден');
        try {
          throw new Error('User not found');
        } catch (error) {
          next(error);
        }
      }
    } else {
      res.send(User);
    }
  });
});

router.patch('/users/me/avatar', (req, res, next) => {
  const condition = { name: req.body.find };
  const update = {
    avatar: req.body.avatar,
  };
  User.findOneAndUpdate(condition, update).exec((err, User) => {
    if (!User) {
      res.status(404).send('Пользователь не найден');
      try {
        throw new Error('User not found');
      } catch (error) {
        next(error);
      }
    } else {
      res.send(User.avatar);
    }
  });
});
module.exports = router;
