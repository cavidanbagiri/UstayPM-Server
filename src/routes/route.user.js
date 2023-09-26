
const express = require('express');
const router = express.Router();

const UserController = require('../controllers/controller.user')

router.post('/login', UserController.loginUser);


module.exports = router
