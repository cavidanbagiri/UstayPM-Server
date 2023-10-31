const {
  ProcurementServiceFetchSTF,
  ProcurementServiceFetchSM,
  ProcurementServiceCreateSM
} = require("../services/service.procurement");
const tryCatch = require("../utils/trycatch");

class ProcurementController {
  // Fetch All STF
  static async fetchSTF(req, res, next) {
    tryCatch(
      await ProcurementServiceFetchSTF.fetchSTF()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch STF Error From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch All STF
  static async fetchSM(req, res, next) {
    const project_id = req.params.project_id;
    tryCatch(
      await ProcurementServiceFetchSM.fetchSM(project_id)
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch STF Error From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch All STF
  static async createSM(req, res, next) {
    const data= req.body;
    tryCatch(
      await ProcurementServiceCreateSM.createSM(data)
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch STF Error From Procurement");
          next(err);
        })
    );
    return "OK";
  }
  
  // Fetch Procurement Users
  static async fetchSTFCreateUsernames(req, res, next) {
    tryCatch(
      await ProcurementServiceFetchCreatedSTFUsernames.fetchSTFCreateUsernames()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch Procurement Users Errors From Procurement");
          next(err);
        })
    );
    return "OK";
  }

}

module.exports = ProcurementController;
