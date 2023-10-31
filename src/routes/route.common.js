
const express = require('express');
const router = express.Router();
const CommonController = require('../controllers/controller.common');

// Filter All STF
router.get('/filterstf', CommonController.filterSTF);

// Filter All SM
router.get('/filtersm', CommonController.filterSM);

// Filter Warehouse
router.get('/filterwarehouse', CommonController.filterWarehouse);





module.exports = router;