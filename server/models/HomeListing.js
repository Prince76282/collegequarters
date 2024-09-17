const mongoose = require('mongoose');

const homeListingSchema = new mongoose.Schema({
  title: String,
  area: String,
  price: Number,
  beds: Number,
  baths: Number,
  homeType: String,
  forRent: Boolean,
  phoneNo: String,
  imageUrls: [String],
  videoUrl: String,
  amenities: [String],
  nearbyAreas: [String],
  bargain: Boolean
});

const HomeListing = mongoose.model('HomeListing', homeListingSchema);

module.exports = HomeListing;
