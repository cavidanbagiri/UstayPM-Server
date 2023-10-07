
const express = require('express');
const ProcurementController = require('../controllers/controller.procurement');
const router = express.Router();

// Fetch All STF and show STF Page
router.get('/fetchstf', ProcurementController.fetchSTF);


// Fetch All STF and show STF Page
router.get('/fetchsm', ProcurementController.fetchSM);

// Create new SM
router.post('/createsm', ProcurementController.createSM)

// Fetch Companies Names
router.get('/companies', ProcurementController.fetchCompanies);

// Fetch Procurement Users Names
router.get('/users', ProcurementController.fetchProcurementUsers);

module.exports = router
