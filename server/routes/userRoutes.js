// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create or update user
router.post('/', async (req, res) => {
  const { name, email, phone, image } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      // Update existing user
      user = await User.findOneAndUpdate(
        { email },
        { name, phone, image },
        { new: true } // Return the updated document
      );
    } else {
      // Create new user
      user = new User({ name, email, phone, image });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
