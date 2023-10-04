

const { sequelize } = require('../../models');

const ProcurementQueries = require('../queries/procurement.queries');

// Fetch All STF
class ProcurementServiceFetchSTF {

  // Fetch All STF
  static async fetchSTF(){

    const string_query = ProcurementQueries.select_all_stf_query;

    const result = await sequelize.query(string_query);

    return result[0];
  }

}


module.exports = {
  ProcurementServiceFetchSTF
}