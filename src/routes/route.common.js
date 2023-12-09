
const express = require('express');
const router = express.Router();
const CommonController = require('../controllers/controller.common');

// Filter All STF
router.get('/filterstf', CommonController.filterSTF);

// Filter All SM
router.get('/filtersm', CommonController.filterSM);

// Filter Warehouse
router.get('/filterwarehouse', CommonController.filterWarehouse);

// Filter Provided Materials
router.get('/filterprovided', CommonController.filterProvided);

// Fetch Field Names
router.get('/fetchfields/:project_id', CommonController.fetchfields);

// Fetch Companies
router.get('/fetchcompanies', CommonController.fetchCompanies);

// Fetch All Users
router.get('/fetchallusers', CommonController.fetchAllUsers);

// Fetch Procurment Users
router.get('/procurementusers', CommonController.fetchProcurementUsers);

// Fetch Usernames Who Create STF
router.get('/createdstfusers', CommonController.fetchSTFCreateUsernames);

// Fetch Departments
router.get('/fetchdepartments', CommonController.fetchDepartments);

// Fetch Row Inform By STF ID
router.get('/fetchstfrowinform/:stf_id', CommonController.fetchSTFRowInform);

// Get Statistic Data
router.get('/statisticdata/:user_id', CommonController.getStatisticData);

// Send Message To User
router.post('/sendmessage', CommonController.sendMessage);

// Fetch Message
router.get('/fetchmessage/:current_id', CommonController.fetchMessage);

// Fetch Filtered Vendornames
router.get('/filtervendornames', CommonController.filterVendorName);

// Post Nofitication Reading
// router.post('/readnotification/:user_id', CommonController.readNotification);



module.exports = router;