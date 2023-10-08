const tryCatch = require("../utils/trycatch");
const {
  WarehouseServiceFetchProcessingSMS,
  WarehouseServiceAcceptSMS
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

}

module.exports = WarehouseController;
