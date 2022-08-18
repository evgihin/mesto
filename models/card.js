const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  link: String,
  owner: mongoose.ObjectId,
  likes: {
    type: mongoose.ObjectId,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('card', cardSchema);
