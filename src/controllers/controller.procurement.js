const { ProcurementServiceFetchSTF } = require("../services/service.procurement");
const tryCatch = require("../utils/trycatch");




class ProcurementController {

  // Fetch All STF
  static async fetchSTF(req, res, next){

    tryCatch(
      await ProcurementServiceFetchSTF.fetchSTF()
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Fetch STF Error From Procurement');
        next(err);
      })
    )

    return 'OK';
  }

}


module.exports = ProcurementController