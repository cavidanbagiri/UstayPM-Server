const CommonQueries = require("../queries/common_queries");
const WhereQuery = require("../utils/whereQuery");
const { sequelize, FieldsModel } = require("../../models");
const {getSocketInstance} = require('../utils/io');

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
  static async filterWarehouse(query) {
    const where_query = WhereQuery.WarehouseWhereQuery(
      "where",
      query,
      "warehouse_models"
    );
    const string_query = `
    ${CommonQueries.received_sms_from_warehouse_query}
      ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class CommonServiceFilterProvided {
  // Fetch Warehouse Data
  static async filterProvided(query) {
    const where_query = WhereQuery.ProvidedWhereQuery(
      "where",
      query,
      "provided_models"
    );
    const string_query = `
    ${CommonQueries.fetch_provide_data}
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
    const res = await sequelize.query(
      CommonQueries.fetch_stf_row_inform + stf_id
    );
    return res[0];
  }
}

class CommonServiceStatisticData {
  // Combine Result
  static async getStatisticData(user_id) {
    // Fetch Statistic Result Data
    const stf_inform = await this.getSTFStatisticData();
    const sm_inform = await this.getSMStatisticData();
    const warehouse_inform = await this.getWarehouseStatisticResult();

    // Create Socket Emit for New STF Notification
    await CommonServiceNewSTFNotification.getNewSTFNotification(user_id);

    return this.combineResult(stf_inform, sm_inform, warehouse_inform);
  }

  // Get STF Statistic Data
  static async getSTFStatisticData() {
    const res = await sequelize.query(CommonQueries.get_stf_statistic_result);
    return res[0];
  }

  // Get SM Statistic Data
  static async getSMStatisticData() {
    const res = await sequelize.query(CommonQueries.get_sm_statistic_result);
    return res[0];
  }

  // Get Warehouse Data Count where stock not equal 0
  static async getWarehouseStatisticResult() {
    const res = await sequelize.query(
      CommonQueries.get_warehouse_statistic_result
    );
    return res[0];
  }

  // Get Combine Result
  static combineResult(stf_inform, sm_inform, warehouse_inform) {
    let return_data = {};
    // Combine Data STF
    for (let i of stf_inform) {
      if (!i?.completed) return_data.stf_false = i?.count;
      if (i?.completed) return_data.stf_true = i?.count;
    }
    // Combine Data SM
    for (let i of sm_inform) {
      if (i?.status_name === "Processing") return_data.sm_process = i?.count;
      if (i?.status_name === "Completed") return_data.sm_completed = i?.count;
    }
    // Combine Warehouse
    if (warehouse_inform.length) {
      return_data.warehouse_inform = warehouse_inform[0]?.count;
    }
    return return_data;
  }
}

class CommonServiceNewSTFNotification {
  // Get New STF Notification
  static async getNewSTFNotification(user_id) {
    const result = await sequelize.query(CommonQueries.get_new_stf_notification_result + user_id);
    const io = getSocketInstance();
    io.emit('getstfnotification', result[0]);
  }
}

class CommonServiceReadNotification {

  // Set Notification as Readed
  static async readNotification(user_id) {
    await sequelize.query(CommonQueries.read_notification + user_id);
    return 'OK';
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
  CommonServiceFetchSTFRowInform,
  CommonServiceFilterProvided,
  CommonServiceStatisticData,
  CommonServiceReadNotification,
  CommonServiceNewSTFNotification,
};
