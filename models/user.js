const mongoose = require('mongoose');

const userShema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  avatar: String,
});
module.exports = mongoose.model('user', userShema);
