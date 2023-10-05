const {
  ProcurementServiceFetchSTF,
  ProcurementServiceFetchCompanies,
  ProcurementServiceFetchProcurementUsers,
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
  static async createSM(req, res, next) {
    console.log("---------");
    console.log('create sm body : ', req.body);
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

  // Fetch All Companies
  static async fetchCompanies(req, res, next) {
    tryCatch(
      await ProcurementServiceFetchCompanies.fetchCompanies()
        .then((respond) => {
          res.status(200).send(respond);
        })
        .catch((err) => {
          console.log("Fetch COmpanies Error From Procurement");
          next(err);
        })
    );
    return "OK";
  }

  // Fetch Procurement Users
  static async fetchProcurementUsers(req, res, next) {
    tryCatch(
      await ProcurementServiceFetchProcurementUsers.fetchProcurementUsers()
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
