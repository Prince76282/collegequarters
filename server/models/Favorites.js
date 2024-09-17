// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'HomeListing', required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
