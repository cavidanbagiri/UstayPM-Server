const express = require("express");

const router = express.Router();

const WarehouseController = require("../controllers/controller.warehouse");
const warehouseMiddleware = require('../middleware/warehouse_middleware');

// Fetch Received SM To Warehouse
router.get('/', WarehouseController.fetchWarehouseData);

// Fetch Departments
router.get('/departments', WarehouseController.fetchDepartments);

// Fetch Warehouse Delivery Types
router.get('/deliverytypes', WarehouseController.fetchWarehouseDeliveryTypes);

// Accept SM TO Warehouse
router.post("/accept", warehouseMiddleware, WarehouseController.acceptSM);

// Provide Material To Area
router.post('/provide', warehouseMiddleware, WarehouseController.provideMaterial);

// Return From Area and Add Warehouse Stock
router.post('/return', warehouseMiddleware, WarehouseController.returnMaterial);

module.exports = router;
