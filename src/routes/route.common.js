
const express = require('express');
const router = express.Router();
const CommonController = require('../controllers/controller.common');
const cancelSTF = require('../middleware/cancelstf_middleware');

// Filter All STF
router.get('/filterstf', CommonController.filterSTF); // -> Each Project

// Filter All SM
router.get('/filtersm', CommonController.filterSM); // -> Each Project

// Filter Warehouse
router.get('/filterwarehouse', CommonController.filterWarehouse); // -> Each Project

// Filter Provided Materials
router.get('/filterprovided', CommonController.filterProvided); // -> Each Project

// Fetch Warehouse Delivery Types
router.get('/deliverytypes', CommonController.fetchWarehouseDeliveryTypes); // -> For All Projects

// Fetch Field Names
router.get('/fetchfields/:project_id', CommonController.fetchfields); // -> Each Project

// Fetch Companies
router.get('/fetchcompanies', CommonController.fetchCompanies); // -> For All Projects

// Fetch Filtered Vendornames
router.get('/filtervendornames', CommonController.filterVendorName); // -> For All Projects

// Fetch Procurment Users
router.get('/procurementusers/:project_id', CommonController.fetchProcurementUsers); // -> Each Project

// Fetch Usernames Who Create STF
router.get('/createdstfusers/:project_id', CommonController.fetchSTFCreateUsernames); // -> Each Project

// Fetch Departments
router.get('/fetchdepartments', CommonController.fetchDepartments); // -> For All Projects

// Fetch Row Inform By STF ID
router.get('/fetchstfrowinform/:stf_id', CommonController.fetchSTFRowInform); // -> Each Project

// Fetch Row Inform By STF ID
router.get('/fetchstfdata/:project_id', CommonController.fetchSTFData); // -> Each Project

// Get STF SM Statistic Data
router.get('/statisticdata/:user_id', CommonController.getStatisticData); // -> Each Project

// Getc Statistic Data For Group Chart
router.get('/groupchartstatisticdata/:project_id', CommonController.groupChartStatisticData); // -> Each Project

// Send Message To User
router.post('/sendmessage', CommonController.sendMessage); // -> For All Projects

// Fetch Message
router.get('/fetchmessage/:current_id', CommonController.fetchMessage); // -> For All Projects

// Fetch All Users
router.get('/fetchallusers', CommonController.fetchAllUsers); // -> For All Projects

// Fetch Unread Message
router.get('/fetchunreadmessages/:current_id', CommonController.fetchUnreadMessages) // -> For All Projects

// Fetch Unread Messages and All Users
router.get('/fetchunreadmessagesandusers/:current_id', CommonController.fetchUnreadMessagesAndUsers); // -> For All Projects

// Set True unread messages
router.post('/settruemessages', CommonController.setTrueReadingMessages); // -> For All Projects

// Post Nofitication Reading
router.post('/readnotification/:user_id', CommonController.readNotification); // -> For All Projects

// Change STF Statis
router.post('/changestatus', CommonController.setStfStatus); // -> Each Project

// Cancel STF
router.post('/cancelstf', cancelSTF, CommonController.cancelSTF); // -> Each Project

module.exports = router;