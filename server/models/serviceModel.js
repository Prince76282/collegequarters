const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceType: {
    type: String,
    enum: ['Electrician', 'Home Cleaner', 'Plumber', 'Laundry'],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
