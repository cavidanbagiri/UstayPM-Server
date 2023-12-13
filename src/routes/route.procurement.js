
const express = require('express');
const ProcurementController = require('../controllers/controller.procurement');
const router = express.Router();

const procurementMiddleware = require('../middleware/procurement_middleware');

// Fetch All STF and show STF Page
router.get('/fetchstf', ProcurementController.fetchSTF);

// Fetch All STF and show STF Page
router.get('/fetchsm/:project_id', ProcurementController.fetchSM);

// Create new SM
router.post('/createsm', procurementMiddleware, ProcurementController.createSM)


module.exports = router
