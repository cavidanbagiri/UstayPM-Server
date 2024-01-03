const CommonQueries = require("../queries/common_queries");
const WhereQuery = require("../utils/whereQuery");
const {
  sequelize,
  FieldsModel,
  MessageModel,
  RoomModel,
  STFModel,
  CanceledSTFModel,
  ProjectModel,
  UserModel,
  DepartmentModel,
  SMModel,
  VendorModel,
  WarehouseModel,
  SituationModel,
  ConditionModel
} = require("../../models");
const { getSocketInstance } = require("../utils/io");

class CommonServiceFilterSTF {
  static async filterSTF(query) {
    const where_query = WhereQuery.STFWhereQueryTest("where", query, "stf_models");
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
    ${CommonQueries.select_all_sm_query} ${where_query}
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
  static async filterVendorName(selected_text) {
    const result = await sequelize.query(
      CommonQueries.filterVendorName(selected_text)
    );
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
    let return_result = {
      canceled_stf: '',
      stf_result : '',
      sm_result : '',
      warehouse_result : []
    };

    // 1 - Check This STF Canceled Or Not
    const canceledstf_result = await CanceledSTFModel.findAll(
      {
        where:{
          "stfId":stf_id
        },
        include:{
          model: UserModel,
          attributes: ["name", "surname"]
        }
      }
    );

    // 2 - Get STF Inform Data
    const stf_result = await STFModel.findByPk(stf_id, {
      attributes:["id", "stf_num", "material_type", "material_name", "material_amount", "material_unit", "material_link", "material_comment","completed","createdAt"],
      include:[
        {
          model: ProjectModel,
          attributes:["project_name"],
        },
        {
          model: UserModel,
          attributes:["name", "surname", "image_url"],
        },
        {
          model: DepartmentModel,
          attributes:["department_name"],
        },
        {
          model: FieldsModel,
          attributes:["field_name"],
        },
        // {
        //   model: CanceledSTFModel,
        //   attributes:["canceledbyId", "comment", "createdAt"],
        // },
      ]
    });

    // 3 - Get SM Inform Data
    const sm_result = await SMModel.findAll({
      where: {
        "stfId":stf_result.id
      },
      attributes:["id", "sm_num", "sm_material_name", "sm_material_amount", "sm_material_unit", "price", "total","currency","left_over","approximate_date", "createdAt"],
      include:[
        {
          model: ProjectModel,
          attributes:["project_name"],
        },
        {
          model: UserModel,
          attributes:["name", "surname", "image_url"],
        },
        {
          model: VendorModel,
          attributes:["vendor_name"],
        },
        {
          model: ConditionModel,
          attributes:["situationId"],
        },
      ]
    });

    // 4 - Get Warehouse Inform Data
    for(let i of sm_result){
      const warehouse_result = await WarehouseModel.findAll({
        where: {
          "smId":i.id
        },
        attributes:["id", "delivery_material_name", "delivery_material_amount", "delivery_material_unit", "delivery_material_price", "delivery_material_total","delivery_material_currency",
        "doc_number","doc_date","certificate","passport","stock", "providing_date", "createdAt" ],
        include:[
          {
            model: UserModel,
            attributes:["name", "surname", "image_url"],
          },
        ]
      });
      return_result.warehouse_result.push(warehouse_result);
    }    

    return_result.canceled_stf = canceledstf_result;
    return_result.stf_result = stf_result;
    return_result.sm_result = sm_result;
    
    return return_result;
  
  }
}

class CommonServiceStatisticData {
  // Combine Result
  static async getStatisticData(user_id) {
    // Fetch Statistic Result Data
    const stf_inform = await this.getSTFStatisticData();
    const canceled_stf = await this.getCanceledSTF();
    const sm_inform = await this.getSMStatisticData();
    const warehouse_inform = await this.getWarehouseStatisticResult();

    // Create Socket Emit for New STF Notification
    await CommonServiceNewSTFNotification.getNewSTFNotification(user_id);

    return this.combineResult(stf_inform, canceled_stf, sm_inform, warehouse_inform);
  }

  // Get STF Statistic Data
  static async getSTFStatisticData() {
    const res = await sequelize.query(CommonQueries.get_stf_statistic_result);
    return res[0];
  }

  // Get Canceled STF Count
  static async getCanceledSTF() {
    const res = await sequelize.query(CommonQueries.get_canceled_stf_count);
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
  static combineResult(stf_inform, canceled_stf, sm_inform, warehouse_inform) {
    let return_data = {};
    // Combine Data STF
    for (let i of stf_inform) {
      if (!i?.completed) return_data.stf_false = i?.count;
      if (i?.completed) return_data.stf_true = i?.count;
    }
    // Combined Canceled STF
    if(canceled_stf.length){
      return_data.stf_canceled = canceled_stf[0]?.count;
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
    const result = await sequelize.query(
      CommonQueries.get_new_stf_notification_result + user_id
    );
    const io = getSocketInstance();
    io.in(user_id).emit("getstfnotification", result[0]);
  }
}

class CommonServiceReadNotification {
  // Set Notification as Readed
  static async readNotification(user_id) {
    await sequelize.query(CommonQueries.read_notification + user_id);
    return "OK";
  }
}

class CommonServiceSendMessage {
  // Send Message
  static async sendMessage(data) {
    const result = await MessageModel.create({
      senderId: data.sender_id,
      receiverId: data.current_id,
      message_text: data.message_text,
      roomId: data.room_id,
      read: false,
    });
    return "OK";
  }
}

class CommonServiceFetchMessage {
  // Fetch Message
  static async fetchMessage(current_id, selected_id) {
    /* 
      *************** 1 Step
      First Find Room Id if these users have roomid or not, if not create new room id
    */
    const find_room_result = await this.#getRoom(current_id, selected_id);
    /*
     *************** 2 Step, If room id has fetch messages if not go to ************* 3 Step create new room and return back to new messages
     */
    if (find_room_result[0].length) {
      /*
       *************** Step 2.1 Fetch Room id and Messages
       */
      // These two users has any message and room, this will return back the messages from according to roomid
      const result = await this.#fetchAlreadyHasMessage(find_room_result);
      return result[0];
    } else {
      /*
        ************ Come to 3 Step
        Create Room Model and Message Model
      */
      /*
       ************* 3.1 Step, Create new Room
       */
      // Creating Room Model
      const room_model = await RoomModel.create({
        firstuserId: current_id,
        seconduserId: selected_id,
        room_name: current_id + "_" + selected_id,
      });
      /*
       ************* 3.2 Step, Create new Message
       */
      // Creating Message Model
      const message_model = await MessageModel.create({
        message_text: "",
        read: true,
        roomId: room_model.dataValues.id,
        receiverId: current_id,
        senderId: selected_id,
      });
      /*
       ************* 3.3 Step, Fetch New Creating Messages
       */
      const result = await this.#fetchNewCreatedMessage(
        room_model.dataValues.id
      );
      return result[0];
    }
    return "OK";
  }

  // Check The Users has room or not
  static async #getRoom(current_id, selected_id) {
    const find_room = `SELECT * from room_models where 
      ("firstuserId" = ${current_id} and "seconduserId" = ${selected_id} )
      OR
      ("firstuserId" = ${selected_id} and "seconduserId" = ${current_id})
    `;
    const find_room_result = await sequelize.query(find_room);
    return find_room_result;
  }

  // If Room Has, Fetch Messages
  static async #fetchAlreadyHasMessage(find_room_result) {
    const result = await sequelize.query(
      CommonQueries.fetchMessageQuery(find_room_result[0][0].id)
    );

    return result;
  }

  // If Room New Created
  static async #fetchNewCreatedMessage(room_id) {
    const result = await sequelize.query(
      CommonQueries.fetchMessageQuery(room_id)
    );
    return result;
  }
}

class CommonServiceFetchMessagesUnreadCounting{

  // Fetch Unread Messages Count For Receiver
  static async fetchMessagesUnreadCounting(room_id, receiverId){
    const result = await sequelize.query(CommonQueries.fetchMessagesUnreadCounting(room_id, receiverId));
    return result[0]
  }

}

class CommonServiceFetchAllUsers {
  // Fetch All Users
  static async fetchAllUsers() {
    const result = await sequelize.query(CommonQueries.fetch_all_users);
    return result[0];
  }

  // Fetch All Users Except Current User
  static async fetchAllUsersExceptCurrent(current_id) {
    const result = await sequelize.query(CommonQueries.fetch_all_users+ ` where users_models.id != ${current_id}`);
    return result[0];
  }

}

class CommonServiceFetchUnreadMessages {
  // Fetch Unread Messages
  static async fetchUnreadMessages(user_id) {
    const result = await sequelize.query(
      CommonQueries.fetchUnreadMessages(user_id)
    );
    return result[0];
  }
}

class CommonServiceFetchUnreadMessagesAndUsers {
  // Combine unread messages and users list
  static async fetchUnreadMessagesAndUsers(current_id) {
    // Get All Users
    let all_users = await CommonServiceFetchAllUsers.fetchAllUsersExceptCurrent(current_id);
    // Get All Unread Messages
    let unread_messages =
      await CommonServiceFetchUnreadMessages.fetchUnreadMessages(current_id);

    if (all_users?.length && unread_messages?.length) {
      for (let i of unread_messages) {
        all_users = all_users.filter((item) => {
          return item.id != i.id;
        });
      }
      all_users.unshift(...unread_messages);
    }
    return all_users;
  }
}

class CommonServiceSetTrueReadingMessages {
  static async setTrueReadingMessages(room_id, current_id) {
    console.log(room_id, current_id);
    const string_query = `
      update message_models set read = true where read = false and "roomId" = ${room_id} and "senderId" = ${current_id}  
    `
    const result = await sequelize.query(string_query);
    // const string_query = CommonQueries.set_reading_messages_true + room_id;
    // //    console.log('string query : ',string_query);
    // const result = await sequelize.query(
    //   CommonQueries.set_reading_messages_true + room_id
    // );
    // //    console.log('set true is working : ',room_id);
    // return result;
    return 'OK';
  }
}

class CommonServiceChangeSTFStatus {
  static async setStfStatus(body) {
    try {
      const res = await STFModel.update(
        {
          completed: body.completed,
        },
        {
          where: {
            id: body.stf_id,
          },
        }
      );
      return "OK";
    } catch (err) {
      console.log("Change STF Error : ", err);
      return err;
    }
  }
}

// Cancel STF Class
class CommonServiceCancelSTF {

  static async cancelSTF (data) {
    console.log('from frontend side coming data : ', data);
    //return 'OK';
    const respond = await CanceledSTFModel.create({
      stfId: data.stf_id,
      canceledbyId: data.user_id,
      comment: data.comment
    }).then((respond)=>{
      return respond;
    }).catch((err)=>{
      console.log('Canceled STF Models Error');
      throw new Error(err);
    })
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
  CommonServiceFetchUnreadMessagesAndUsers,
  CommonServiceSetTrueReadingMessages,
  CommonServiceFetchMessagesUnreadCounting,
  CommonServiceChangeSTFStatus,
  CommonServiceCancelSTF
};
