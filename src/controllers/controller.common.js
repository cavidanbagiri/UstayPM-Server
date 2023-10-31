const {
  CommonServiceFilterSTF,
  CommonServiceFilterSM,
  CommonServiceFilterWarehouse
} = require("../services/service.common");
const tryCatch = require("../utils/trycatch");

class CommonController {
  // Fetch STF Filter Function
  static async filterSTF(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterSTF.filterSTF(query)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Filter STF Error : ", err);
          next(err);
        })
    );
  }

  // Filter STF Result
  static async filterSM(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterSM.filterSM(query)
        .then((respond) => {
          return res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Filter STF Error : ", err);
          next(err);
        })
    );
  }

  // Filter STF Result
  static async filterWarehouse(req, res, next) {
    const query = req.query;
    tryCatch(
      await CommonServiceFilterWarehouse.filterWarehouse(query)
      .then((respond)=>{
        return res.status(200).send(respond)
      })
      .catch((err)=>{
        console.log('Filter STF Error : ',err);
        next(err);
      })
    )
  }

}

module.exports = CommonController;
