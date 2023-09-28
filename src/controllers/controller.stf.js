const tryCatch = require("../utils/trycatch");

const { STFServiceCreate, FetchUserSTF } = require("../services/service.stf");

class STFController {

  // Create STF
  static async createSTF(req, res, next) {
    const data = req.body;
    tryCatch(
      await STFServiceCreate.createSTF(data)
      .then((respond)=>{
        console.log('Create STF respond ', respond);
        return res.status(201).send(respond)
      })
      .catch((err)=>{
        // console.log('Create STF Error : ',err);
        next(err);
      })
    )
  }

  // Fetch All STF
  static async fetchUserSTFAll(req, res, next) {
    console.log('called');
    const user_id = req.params.user_id;
    console.log('user id : ',user_id);
    tryCatch(
      await FetchUserSTF.fetchUserSTFAll(user_id)
      .then((respond)=>{
        console.log('Fetch STF For User ', respond);
        return res.status(200).send(respond)
      })
      .catch((err)=>{
        console.log('Fetch STF Error : ',err);
        next(err);
      })
    )
  }

}

module.exports = STFController;
