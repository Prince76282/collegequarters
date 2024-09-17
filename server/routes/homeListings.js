const express = require('express');
const router = express.Router();
const HomeListing = require('../models/HomeListing');
const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid ID format');
  }
  next();
};

router.get('/', async (req, res) => {
  try {
    const listings = await HomeListing.find();
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', validateObjectId, async (req, res) => {
  try {
    const home = await HomeListing.findById(req.params.id);
    if (!home) return res.status(404).send('Home not found');
    res.json(home);
  } catch (err) {
    console.error('Error fetching home details:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/upload', async (req, res) => {
  try {
    const homeListings = req.body;

    if (!Array.isArray(homeListings)) {
      return res.status(400).send('Invalid data format. Expected an array of home listings.');
    }


    await HomeListing.insertMany(homeListings);
    res.status(201).send('Data uploaded successfully');
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).send('Error uploading data');
  }
});

module.exports = router;
