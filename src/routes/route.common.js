
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

// Fetch Filtered Vendornames
router.get('/filtervendornames', CommonController.filterVendorName);


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

// Fetch All Users
router.get('/fetchallusers', CommonController.fetchAllUsers);

// Fetch Unread Message
router.get('/fetchunreadmessages/:current_id', CommonController.fetchUnreadMessages)

// Fetch Unread Messages and All Users
router.get('/fetchunreadmessagesandusers/:current_id', CommonController.fetchUnreadMessagesAndUsers);

// Set True unread messages
router.post('/settruemessages', CommonController.setTrueReadingMessages);

// Post Nofitication Reading
router.post('/readnotification/:user_id', CommonController.readNotification);

// Change STF Statis
router.post('/changestatus', CommonController.setStfStatus);


// Cancel STF
router.post('/cancelstf', CommonController.cancelSTF);

module.exports = router;