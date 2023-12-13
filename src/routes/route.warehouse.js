const express = require("express");

const router = express.Router();

const WarehouseController = require("../controllers/controller.warehouse");
const warehouseMiddleware = require('../middleware/warehouse_middleware');

// Accept SM TO Warehouse
router.post("/accept", warehouseMiddleware, WarehouseController.acceptSM);

// Fetch Received SM To Warehouse
router.get('/', WarehouseController.fetchWarehouseData);

// Provide Material To Area
router.post('/provide', warehouseMiddleware, WarehouseController.provideMaterial);

// Fetch Departments
router.get('/departments', WarehouseController.fetchDepartments);

// Fetch Warehouse Delivery Types
router.get('/deliverytypes', WarehouseController.fetchWarehouseDeliveryTypes);

module.exports = router;
