const tryCatch = require("../utils/trycatch");

const { STFServiceCreate } = require("../services/service.stf");

class STFController {
  static async createSTF(req, res, next) {
    const data = req.body;
    tryCatch(
      await STFServiceCreate.createSTF(data)
      .then((respond)=>{
        console.log('Create STF respond ', respond);
        return res.status(201).send(respond)
      })
      .catch((err)=>{
        console.log('Create STF Error : ',err);
        next(err);
      })
    )

  }
}

module.exports = STFController;
