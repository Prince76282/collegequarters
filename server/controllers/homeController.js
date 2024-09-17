
const Home = require('../models/');


exports.getHomes = async (req, res) => {
  try {
    const homes = await Home.find();
    res.json(homes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.createHome = async (req, res) => {
  const homeData = req.body;
  try {
    const newHome = new Home(homeData);
    await newHome.save();
    res.status(201).json(newHome);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
