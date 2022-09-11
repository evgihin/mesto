const express = require('express');
const mongoose = require('mongoose');
const Card = require('../models/card');

const router = express.Router();

let cards;
let allCards;
const id = '630dbf0536a1faa78d8256c2';

router.post('/cards', async (req, res, next) => {
  cards = Card({
    name: req.body.name,
    link: req.body.link,
    owner: new mongoose.Types.ObjectId(id),
  });
  try {
    await cards.save();
  } catch (err) {
    res.status(400).send('Некоректные данные');
    next(err);
  }
  res.end();
});

router.get('/cards', (req, res) => {
  Card.find({ }).select('name link -_id').exec(function (err, Card) {
    allCards = Card;
  });
  res.send(allCards);
  res.end();
});

router.delete('/cards/:cardsId', (req, res) => {
 Card.findByIdAndDelete(req.params.cardsId).exec();
  res.end();
});

router.put('/cards/:cardsId/likes', (req, res) => {
  Card.findByIdAndUpdate(req.params.cardsId, { $addToSet: { likes: id } }, { new: true }).exec();
  res.end();
});
router.delete('/cards/:cardsId/likes', (req, res) => {
  Card.findByIdAndUpdate(req.params.cardsId, { $pull: { likes: id } }, { new: true }).exec();
  res.end();
});
module.exports = router;
