const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const HomeListing = require('../models/HomeListing');

router.post('/api/favorites', async (req, res) => {
  try {
    const { email, homeId, imageUrl } = req.body;

    if (!email || !homeId) {
      return res.status(400).json({ error: 'Email and homeId are required' });
    }

    // Verify that the homeId exists in the HomeListing collection
    const homeListing = await HomeListing.findById(homeId);
    if (!homeListing) {
      return res.status(404).json({ error: 'Home listing not found' });
    }

    const newFavorite = new Favorite({ email, homeId, imageUrl });
    await newFavorite.save();

    res.status(200).json({ message: 'Home saved successfully', favorite: newFavorite });
  } catch (error) {
    console.error('Error saving home:', error.message);
    res.status(500).json({ error: 'Failed to save home', message: error.message });
  }
});

module.exports = router;
