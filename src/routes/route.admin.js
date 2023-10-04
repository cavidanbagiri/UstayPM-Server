
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/controller.admin');

router.post('/createproject', AdminController.createProject);
router.post('/createdepartment', AdminController.createDepartment);
router.post('/setstatus', AdminController.setStatus);
router.post('/createuser', AdminController.createUser);
router.post('/createfield', AdminController.createField);
router.post('/createdefaultrowstfnums', AdminController.createDefaultRowSTFNUMS);
router.get('/project/:project_id', AdminController.fetchProject);
router.get('/fieldnames/:project_id', AdminController.fetchfields);
router.post('/createvendor/', AdminController.createVendor);

module.exports = router
