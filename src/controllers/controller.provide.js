
const {ProvideServiceFetchData} = require('../services/service.provide');
const tryCatch = require('../utils/trycatch');

class ProvideController {

  // Get Provides Data
  static async getProvidesData(req, res, next) {

    tryCatch(
      await ProvideServiceFetchData.getProvidesData()
      .then((respond)=>{
        return res.send(respond);
      })
      .catch((err)=>{
        throw new Error(err);
      })
    )

    return 'OK';

  }

}


module.exports = ProvideController;