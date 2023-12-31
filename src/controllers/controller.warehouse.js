const tryCatch = require("../utils/trycatch");
const {
  // WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchWarehouseData,
  WarehouseServiceProvideSM,
  WarehouseServiceFetchDepartments,
  WarehouseServiceFetchWarehouseDeliveryTypes,
  WarehouseServiceReturnMaterial
} = require("../services/service.warehouse");

class WarehouseController {

  // Accept Processing SMS TO Warehouse
  static async acceptSM(req, res, next) {
    const data = req.body;
    tryCatch(
      await WarehouseServiceAcceptSMS.acceptSMS(data)
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

  // Fetch Received SM From Warehouse
  static async fetchWarehouseData(req, res, next) {
    const project_id = req.params.project_id;
    tryCatch(
      await WarehouseServiceFetchWarehouseData.fetchWarehouseData(project_id)
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
    console.log('---------------------------------------------------------------------------------------------------------------------------department work : ');
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
    console.log('---------------------------------------------------------------------------------------------------------------------------delivery types work');
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

  // Return Material From Area To Warehouse
  static async returnMaterial (req, res, next) {
    const data = req.body;
    tryCatch(
      await WarehouseServiceReturnMaterial.returnMaterial(data)
      .then((respond) => {
        return res.send(respond);
      })
      .catch((err) => {
        console.log("Accept SMS Error : ", err);
        next(err);
      })
    )
  }


}

module.exports = WarehouseController;
