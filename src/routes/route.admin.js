
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/controller.admin');

router.post('/createproject', AdminController.createProject);
router.post('/createdepartment', AdminController.createDepartment);

module.exports = router
