const express = require("express");

const router = express.Router();

const WarehouseController = require("../controllers/controller.warehouse");

// fetch Processing Sm
router.get("/processingsm", WarehouseController.fetchProcessingSM);

// Accept SM TO Warehouse
router.post("/accept", WarehouseController.acceptSM);

// Fetch Received SM To Warehouse
router.get('/receivedsm', WarehouseController.fetchSMFromWarehouse);

// Provide Material To Area
router.post('/provide', WarehouseController.provideMaterial);

// Fetch Departments
router.get('/departments', WarehouseController.fetchDepartments);

// Fetch Warehouse Delivery Types
router.get('/deliverytypes', WarehouseController.fetchWarehouseDeliveryTypes);

module.exports = router;
