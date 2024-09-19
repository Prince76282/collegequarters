const express = require('express');
const { getServices, addService } = require('../controllers/serviceController');
const router = express.Router();


router.get('/', getServices);


router.post('/', addService);

module.exports = router;
