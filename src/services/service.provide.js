
const { sequelize } = require('../../models');
const ProvidedQueries = require('../queries/provided.queries');

class ProvideServiceFetchData {

  static async getProvidesData (project_id) {
    const result = await sequelize.query(ProvidedQueries.fetch_provide_data + ' where sm_models."projectId" = ' + 1);
    return result[0];
  }

}


module.exports = {
  ProvideServiceFetchData
}