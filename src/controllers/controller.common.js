const {
  CommonServiceFilterSTF,
  CommonServiceFilterSM,
  CommonServiceFilterWarehouse,
  CommonServiceFetchFields,
  CommonServiceFetchCompanies,
  CommonServiceFetchProcurementUsers,
  CommonServiceFetchCreatedSTFUsers,
  CommonServiceFetchDepartments,
  CommonServiceFetchSTFRowInform
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

  // Fetch Fields Name 
  static async fetchfields (req, res, next){
    const project_id = req.params.project_id;
    tryCatch(
      await CommonServiceFetchFields.fetchfields(project_id)
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Project Id Row Created Error : ',err);
        next(err)
      })
    )
  }

  // Fetch Companies
  static async fetchCompanies (req, res, next){
    tryCatch(
      await CommonServiceFetchCompanies.fetchCompanies()
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
      await CommonServiceFetchProcurementUsers.fetchProcurementUsers()
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

  // Fetch Procurement Users
  static async fetchSTFCreateUsernames(req, res, next) {
    tryCatch(
      await CommonServiceFetchCreatedSTFUsers.fetchSTFCreateUsernames()
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

  // Fetch Departments
  static async fetchDepartments(req, res, next) {
    tryCatch(
      await CommonServiceFetchDepartments.fetchDepartments()
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Departments Error : ", err);
          next(err);
        })
    );
  }

  // Fetch Row Inform By STF ID
  static async fetchSTFRowInform(req, res, next) {
    const stf_id = req.params.stf_id;
    tryCatch(
      await CommonServiceFetchSTFRowInform.fetchSTFRowInform(stf_id)
        .then((respond) => {
          return res.send(respond);
        })
        .catch((err) => {
          console.log("Fetch Departments Error : ", err);
          next(err);
        })
    );

    return 'OK';
  }

}

module.exports = CommonController;
