
const express = require('express');
const router = express.Router();

const STFController = require('../controllers/controller.stf');

router.post('/createstf', STFController.createSTF);


module.exports = router