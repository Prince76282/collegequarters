const Service = require('../models/serviceModel');

// Get all services or filter by type
const getServices = async (req, res) => {
  try {
    const { serviceType } = req.query;
    const query = serviceType ? { serviceType } : {};
    const services = await Service.find(query);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new service
const addService = async (req, res) => {
  try {
    const { name, phone, address, price, serviceType, imageUrl } = req.body;
    const newService = new Service({ name, phone, address, price, serviceType, imageUrl });
    const createdService = await newService.save();
    res.status(201).json(createdService);
  } catch (error) {
    res.status(400).json({ message: 'Invalid service data' });
  }
};

module.exports = { getServices, addService };
