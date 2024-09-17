
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const HomeListing = require('../models/HomeListing');


router.post('/', async (req, res) => {
  const { email, homeId } = req.body;

  try {
    
    const existingFavorite = await Favorite.findOne({ email, homeId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Home is already in favorites' });
    }

    const favorite = new Favorite({ email, homeId });
    await favorite.save();
    res.status(200).json({ message: 'Home added to favorites' });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const favorites = await Favorite.find({ email }).populate('homeId');
    res.status(200).json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/', async (req, res) => {
  const { email, homeId } = req.body;

  try {
    await Favorite.findOneAndDelete({ email, homeId });
    res.status(200).json({ message: 'Home removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
