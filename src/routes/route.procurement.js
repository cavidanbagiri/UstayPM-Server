
const express = require('express');
const ProcurementController = require('../controllers/controller.procurement');
const router = express.Router();

// Fetch All STF and show STF Page
router.get('/fetchstf', ProcurementController.fetchSTF);

// Fetch All STF and show STF Page
router.get('/fetchsm/:project_id', ProcurementController.fetchSM);

// Create new SM
router.post('/createsm', ProcurementController.createSM)


module.exports = router
