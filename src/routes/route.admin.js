
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/controller.admin');

router.post('/createproject', AdminController.createProject);
router.post('/createdepartment', AdminController.createDepartment);
router.post('/setstatus', AdminController.setStatus);

module.exports = router
