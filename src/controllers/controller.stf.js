const tryCatch = require("../utils/trycatch");

const { STFServiceCreate, FetchUserSTF, FilterSTF } = require("../services/service.stf");

class STFController {

  // Create STF
  static async createSTF(req, res, next) {
    const data = req.body;
    tryCatch(
      await STFServiceCreate.createSTF(data)
      .then((respond)=>{
        return res.status(201).send(respond)
      })
      .catch((err)=>{
        // console.log('Create STF Error : ',err);
        next(err);
      })
    )
    // return 'OK'
  }

  // Fetch All STF
  static async fetchUserSTFAll(req, res, next) {
    const user_id = req.params.user_id;
    tryCatch(
      await FetchUserSTF.fetchUserSTFAll(user_id)
      .then((respond)=>{
        return res.status(200).send(respond)
      })
      .catch((err)=>{
        console.log('Fetch STF Error : ',err);
        next(err);
      })
    )
  }

  // Filter STF Section For User
  static async filterSTF(req, res, next) {
    const query = req.query;

    tryCatch(
      await FilterSTF.filterSTF(query)
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

module.exports = STFController;
