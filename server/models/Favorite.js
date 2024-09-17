// models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  email: { type: String, required: true }, // User's email to identify the user
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'HomeListing', required: true }, // Reference to the home listing
  savedAt: { type: Date, default: Date.now }, // When it was saved
});

module.exports = mongoose.model('Favorite', favoriteSchema);
