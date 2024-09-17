// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  image: String,
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

module.exports = User;
