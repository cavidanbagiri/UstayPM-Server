const tryCatch = require("../utils/trycatch");
const {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchWarehouseData,
  WarehouseServiceProvideSM,
  WarehouseServiceFetchDepartments,
  WarehouseServiceFetchWarehouseDeliveryTypes,
} = require("../services/service.warehouse");

class WarehouseController {
  // Fetch processing SMS
  static async fetchProcessingSM(req, res, next) {
    tryCatch(
      await WarehouseServiceFetchProcessingSMS.fetchProcessingSMS()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Processing SMS Error : ", err);
          next(err);
        })
    );
  }

  // Accept Processing SMS TO Warehouse
  static async acceptSM(req, res, next) {
    const data = req.body;
    tryCatch(
      await WarehouseServiceAcceptSMS.acceptSMS(data)
        .then((respond) => {
          return res.send("OK");
          // return res.send(respond);
        })
        .catch((err) => {
          console.log("Accept SMS Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Received SM From Warehouse
  static async fetchWarehouseData(req, res, next) {
    tryCatch(
      await WarehouseServiceFetchWarehouseData.fetchWarehouseData()
        .then((respond) => {
          return res.send(respond);
          // return res.send(respond);
        })
        .catch((err) => {
          console.log("Accept SMS Error : ", err);
          next(err);
        })
    );
  }

  // Provide Material TO Area
  static async provideMaterial(req, res, next) {
    const data = req.body;
    tryCatch(
      await WarehouseServiceProvideSM.provideMaterial(data)
        .then((respond) => {
          return res.send(respond);
          // return res.send(respond);
        })
        .catch((err) => {
          console.log("Accept SMS Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Departments
  static async fetchDepartments(req, res, next) {
    tryCatch(
      await WarehouseServiceFetchDepartments.fetchDepartments()
        .then((respond) => {
          return res.send(respond);
          // return res.send(respond);
        })
        .catch((err) => {
          console.log("Accept SMS Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Warehouse Delivery Types
  static async fetchWarehouseDeliveryTypes (req, res, next) {
    tryCatch(
      await WarehouseServiceFetchWarehouseDeliveryTypes.fetchWarehouseDeliveryTypes()
        .then((respond) => {
          return res.send(respond);
          // return res.send(respond);
        })
        .catch((err) => {
          console.log("Accept SMS Error : ", err);
          next(err);
        })
    );
  }
}

module.exports = WarehouseController;
