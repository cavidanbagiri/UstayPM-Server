
const express = require('express');
const router = express.Router();

const STFController = require('../controllers/controller.stf');

// Create STF For User
router.post('/createstf', STFController.createSTF);

// Fetch All User STF about User
router.get('/getuserstfall/:user_id', STFController.fetchUserSTFAll);

// Get Warehouse Material Who Created By Current User
router.get('/warehouse/:user_id', STFController.fetchWarehouseDataForUser);

// Get Warehouse Material Who Created By Current User
router.get('/provided/:department_id', STFController.fetchProvidedDataForUser);


module.exports = router