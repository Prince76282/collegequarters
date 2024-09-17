// routes/favorites.js
const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorites');
const User = require('../models/User');

// Remove from favorites
router.delete('/remove', async (req, res) => {
  const { email, homeId } = req.body;
  try {
    // Remove favorite entry from Favorites collection
    await Favorite.findOneAndDelete({ email, homeId });

    // Remove homeId from user's savedHomes array
    await User.findOneAndUpdate(
      { email },
      { $pull: { savedHomes: homeId } }
    );

    res.json({ message: 'Home removed from favorites' });
  } catch (error) {
    console.error('Error removing favorite:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
