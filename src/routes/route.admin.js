
const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/constoller.admin');

router.post('/createproject', AdminController.createProject);

module.exports = router
