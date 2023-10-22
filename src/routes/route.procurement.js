
const express = require('express');
const ProcurementController = require('../controllers/controller.procurement');
const router = express.Router();

// Fetch All STF and show STF Page
router.get('/fetchstf', ProcurementController.fetchSTF);

// Filter STF Result
router.get('/filterstf', ProcurementController.filterSTF)

// Fetch All STF and show STF Page
router.get('/fetchsm', ProcurementController.fetchSM);

// Filter SM Result
router.get('/filtersm', ProcurementController.filterSM)

// Create new SM
router.post('/createsm', ProcurementController.createSM)

// Fetch Companies Names
router.get('/companies', ProcurementController.fetchCompanies);

// Fetch Procurement Users Names
router.get('/users', ProcurementController.fetchProcurementUsers);

module.exports = router
