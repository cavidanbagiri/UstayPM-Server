

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

// Fetch All Companies
class ProcurementServiceFetchCompanies{
  // Fetch All Companies
  static async fetchCompanies() {
    const result = await sequelize.query(ProcurementQueries.select_companies);
    return result[0];
  }
}

// Fetch All Companies
class ProcurementServiceFetchProcurementUsers{
  // Fetch Procurement Users
  static async fetchProcurementUsers () {
    const result = await sequelize.query(ProcurementQueries.select_procurement_users);
    return result[0];
  }
}

module.exports = {
  ProcurementServiceFetchSTF,
  ProcurementServiceFetchCompanies,
  ProcurementServiceFetchProcurementUsers,
}