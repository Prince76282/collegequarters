const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  email: { type: String, required: true }, // User's email to identify the user
  homeId: { type: mongoose.Schema.Types.ObjectId, ref: 'HomeListing', required: true }, // Reference to the home listing
  imageUrl: { type: String }, // URL of the image associated with the favorite
  savedAt: { type: Date, default: Date.now }, // When it was saved
});

module.exports = mongoose.model('Favorite', favoriteSchema);
