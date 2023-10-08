const express = require("express");

const router = express.Router();

const WarehouseController = require("../controllers/controller.warehouse");

router.get("/processingsm", WarehouseController.fetchProcessingSM);

router.post("/accept", WarehouseController.acceptSM);

module.exports = router;
