
const express = require('express');
const router = express.Router();
const CommonController = require('../controllers/controller.common');

// Filter All STF
router.get('/filterstf', CommonController.filterSTF);

// Filter All SM
router.get('/filtersm', CommonController.filterSM);

// Filter Warehouse
router.get('/filterwarehouse', CommonController.filterWarehouse);

// Fetch Field Names
router.get('/fetchfields/:project_id', CommonController.fetchfields);

// Fetch Companies
router.get('/fetchcompanies', CommonController.fetchCompanies);

// Fetch Procurment Users
router.get('/procurementusers', CommonController.fetchProcurementUsers);

// Fetch Usernames Who Create STF
router.get('/createdstfusers', CommonController.fetchSTFCreateUsernames);

// Fetch Departments
router.get('/fetchdepartments', CommonController.fetchDepartments);



module.exports = router;