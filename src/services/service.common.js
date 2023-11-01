const CommonQueries = require("../queries/common_queries");
const WhereQuery = require("../utils/whereQuery");
const { sequelize, FieldsModel } = require("../../models");

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

class CommonServiceFetchFields {
  static async fetchfields(projectId) {
    const res = await FieldsModel.findAll({
      attributes: ["id", "field_name"],
      where: {
        projectId: projectId,
      },
    });
    return res;
  }
}

class CommonServiceFetchCompanies {
  // Fetch All Companies
  static async fetchCompanies() {
    const result = await sequelize.query(CommonQueries.select_companies);
    return result[0];
  }
}

class CommonServiceFetchProcurementUsers {
  // Fetch Procurement Users
  static async fetchProcurementUsers() {
    const result = await sequelize.query(
      CommonQueries.select_procurement_users
    );
    return result[0];
  }
}

class CommonServiceFetchCreatedSTFUsers {
  // Fetch Procurement Users
  static async fetchSTFCreateUsernames() {
    const result = await sequelize.query(
      CommonQueries.select_stf_created_users_names
    );
    return result[0];
  }
}

class CommonServiceFetchDepartments {
  static async fetchDepartments() {
    const res = await sequelize.query(CommonQueries.fetch_departments);
    return res[0];
  }
}

class CommonServiceFetchSTFRowInform {
  static async fetchSTFRowInform(stf_id) {
    const res = await sequelize.query(CommonQueries.fetch_stf_row_inform+stf_id);
    console.log('res is : ',res[0][0]);
    return res[0][0];
  }
}

module.exports = {
  CommonServiceFilterSTF,
  CommonServiceFilterSM,
  CommonServiceFilterWarehouse,
  CommonServiceFetchFields,
  CommonServiceFetchCompanies,
  CommonServiceFetchProcurementUsers,
  CommonServiceFetchCreatedSTFUsers,
  CommonServiceFetchDepartments,
  CommonServiceFetchSTFRowInform
};
