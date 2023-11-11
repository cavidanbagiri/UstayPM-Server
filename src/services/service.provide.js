
const { sequelize } = require('../../models');
const ProvidedQueries = require('../queries/provided.queries');

class ProvideServiceFetchData {

  static async getProvidesData () {
    const result = await sequelize.query(ProvidedQueries.fetch_provide_data);
    return result[0];
  }

}


module.exports = {
  ProvideServiceFetchData
}