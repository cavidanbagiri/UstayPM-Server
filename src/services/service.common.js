const CommonQueries = require("../queries/common_queries");
const WhereQuery = require("../utils/whereQuery");
const { sequelize, FieldsModel, MessageModel, RoomModel } = require("../../models");
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


class CommonServiceFilteredVendorNames {
  static async filterVendorName(selected_text){
    const result = await sequelize.query(CommonQueries.filterVendorName(selected_text));
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
    io.in(user_id).emit('getstfnotification', result[0]);
  }
}

class CommonServiceReadNotification {
  // Set Notification as Readed
  static async readNotification(user_id) {
    await sequelize.query(CommonQueries.read_notification + user_id);
    return 'OK';
  }
}

class CommonServiceFetchAllUsers {
  // Fetch All Users
  static async fetchAllUsers(){
    const result = await sequelize.query(CommonQueries.fetch_all_users)
    return result[0]
  }
}

class CommonServiceSendMessage {
  
  // Send Message
  static async sendMessage(data){
    const result = await MessageModel.create({
      senderId: data.sender_id,
      receiverId: data.current_id,
      message_text: data.message_text,
      roomId: data.room_id,
      read: false
    }) 
    return 'OK';
  }
}

class CommonServiceFetchMessage {
  
  // Fetch Message
  static async fetchMessage (current_id, selected_id) {

    /* 
      *************** 1 Step
      First Find Room Id if these users have roomid or not, if not create new room id
    */
    const find_room_result = await this.#getRoom(current_id, selected_id);

    if(find_room_result[0].length){
      // const result = await sequelize.query(CommonQueries.fetchMessageQuery(find_room_result[0][0].id));
      const result = await this.#fetchAlreadyHasMessage(find_room_result);
      return result[0];
    }
    else{
      /*
        ************ 2 Step
        Create Room Model and Message Model
      */
      // Creating Room Model
      const room_model = await RoomModel.create({
        firstuserId: current_id,
        seconduserId: selected_id,
        room_name: current_id+'_'+selected_id
      });
      // Creating Message Model
      const message_model = await MessageModel.create({
        message_text: '',
        read: true,
        roomId: room_model.dataValues.id,
        receiverId: current_id,
        senderId: selected_id,
      })
      const result = await this.#fetchNewCreatedMessage(room_model.dataValues.id);
      return result[0];
    } 
    return 'OK'

  }

  // Check The Users has room or not
  static async #getRoom(current_id, selected_id){
    const find_room = `SELECT * from room_models where 
      ("firstuserId" = ${current_id} and "seconduserId" = ${selected_id} )
      OR
      ("firstuserId" = ${selected_id} and "seconduserId" = ${current_id})
    `
    const find_room_result = await sequelize.query(find_room);
    return find_room_result;
  }

  // If Room Has, Fetch Messages
  static async #fetchAlreadyHasMessage(find_room_result) {
    const result = await sequelize.query(CommonQueries.fetchMessageQuery(find_room_result[0][0].id));

    return result;
  }

  // If Room New Created
  static async #fetchNewCreatedMessage(room_id) {
    const result = await sequelize.query(CommonQueries.fetchMessageQuery(room_id));
    return result;
  }
}

class CommonServiceFetchUnreadMessages {

  static async fetchUnreadMessages (user_id){

    const result = await sequelize.query(CommonQueries.fetchUnreadMessages(user_id));
    console.log('result is : ', result[0]);
    return result[0];
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
  CommonServiceFetchAllUsers,
  CommonServiceSendMessage,
  CommonServiceFetchMessage,
  CommonServiceFetchUnreadMessages,
  CommonServiceFilteredVendorNames,

};
