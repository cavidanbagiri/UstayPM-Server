
const {ProvideServiceFetchData} = require('../services/service.provide');
const tryCatch = require('../utils/trycatch');

class ProvideController {

  // Get Provides Data
  static async getProvidesData(req, res, next) {
    const project_id = req.params.project_id
    console.log('provide : ', project_id)
    tryCatch(
      await ProvideServiceFetchData.getProvidesData(project_id)
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