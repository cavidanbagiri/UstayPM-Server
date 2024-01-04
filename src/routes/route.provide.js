const express = require('express');
const router = express.Router();
const ProvideController = require('../controllers/controller.provide');

// Get Provides Data
router.get('/:project_id', ProvideController.getProvidesData);

module.exports = router;
