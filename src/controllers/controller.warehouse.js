const tryCatch = require("../utils/trycatch");
const {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS,
  WarehouseServiceFetchReceivedSMS,
  WarehouseServiceProvideSM
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
    )
  }

  // Fetch Received SM From Warehouse
  static async fetchSMFromWarehouse(req, res, next) {
    tryCatch(
      await WarehouseServiceFetchReceivedSMS.fetchSMFromWarehouse()
      .then((respond) => {
        console.log('cont respond is ',respond);
        return res.send(respond);
        // return res.send(respond);
      })
      .catch((err) => {
        console.log("Accept SMS Error : ", err);
        next(err);
      })
    )
  }

  // Provide Material TO Area
  static async provideMaterial(req, res, next) {
    const data = req.body;
    console.log('data is : ', data);
    tryCatch(
      await WarehouseServiceProvideSM.provideMaterial(data)
      .then((respond) => {
        console.log('is ',respond);
        return res.send(respond);
        // return res.send(respond);
      })
      .catch((err) => {
        console.log("Accept SMS Error : ", err);
        next(err);
      })
    )

  }

}

module.exports = WarehouseController;
