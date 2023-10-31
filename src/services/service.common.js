const CommonQueries = require("../queries/common_queries");
const WhereQuery = require("../utils/whereQuery");
const { sequelize } = require("../../models");

class CommonServiceFilterSTF {
  static async filterSTF(query) {
    const where_query = WhereQuery.STFWhereQuery("where", query, "stf_models");
    const string_query = `
    ${CommonQueries.select_all_stf_query} ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class CommonServiceFilterSM {
  static async filterSM(query) {
    const where_query = WhereQuery.SMWhereQuery("where", query, "sm_models");
    const string_query = `
    ${CommonQueries.select_all_sm_query}
      ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class CommonServiceFilterWarehouse {
  // Fetch Warehouse Data
  static async filterWarehouse (query) {
    const where_query = WhereQuery.WarehouseWhereQuery("where", query, "warehouse_models");
    const string_query = `
    ${CommonQueries.received_sms_from_warehouse_query}
      ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

module.exports = {
  CommonServiceFilterSTF,
  CommonServiceFilterSM,
  CommonServiceFilterWarehouse
};
