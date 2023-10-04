
const express = require('express');
const ProcurementController = require('../controllers/controller.procurement');
const router = express.Router();

router.get('/fetchstf', ProcurementController.fetchSTF);



module.exports = router
