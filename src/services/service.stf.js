const { sequelize, STFModel, ProjectModel, NewSTFNotificationModel } = require("../../models");
const STFQueries = require("../queries/stf_queries");
const EmptyFieldError = require("../exceptions/EmptyFieldError");
// const WhereQuery = require("../utils/whereQuery");
const {getSocketInstance} = require('../utils/io');
const {CommonServiceNewSTFNotification} = require('./service.common');

// Create STF Class
class STFServiceCreate {
  // Create STF
  static async createSTF(data) {

    // Step 1 -> Validate All Column that, Each row and common information is true || not
    try {
      this.#checkValidation(data);
    } catch (err) {
      throw new Error(err)
    }
    
    // Step 2 -> Set STF Num inside of data and insert to table -> SRU.RS.07.10003
    // data.stf_num = await this.#createSTFNUMSForm(data);
    data.stf_num = await this.#newcreateSTFNUMSForm(data).then((respond)=>{
      return respond;
    })

    // Step 3 -> Foreach users entering orders and create one-by-one 
    for (let i of data.orders) {
      await this.#createEachRow(data, i);
    }

    // Step 4 -> Create New Row In NewSTFNotification Model and set as false and show +1 bell to procurement and warehouse users
    let notify_data = {
      stf_num : data.stf_num,
      create_user_id: data.user.id
    }; 
    await CreateNewSTFNotification.createNewSTFNotification(1, notify_data);

    return "OK";
  }

  // Return stf_nums form for STFModel [DEPRECATED]
  static async #createSTFNUMSForm(data) {
    // Get Last STFNums value // 10003
    const last_created_stf_num = await this.#getLastNumsAddAndCreateSTFNums(
      data.user.projectId
    );
    // Get Project code_name // SRU.RS.07 + 10003 = SRU.RS.07.10003
    const project_code_name = await this.#getProjectCodeName(
      data.user.projectId
    );
    // Create stf_nums accoring to STFModel
    let stf_num = project_code_name + last_created_stf_num.toString();
    return stf_num;
  }

  // Return stf_nums form for STFModel
  static async #newcreateSTFNUMSForm(data) {
    // Get Last STFNums value // 10003
    let stf_num = ''
    const last_created_stf_num = await this.#getLastNumsAddAndCreateSTFNums(
      data.user.projectId
    ).then(async (respond)=>{
      // Get Project code_name // SRU.RS.07 + 10003 = SRU.RS.07.10003
      const project_code_name = await this.#getProjectCodeName(
        data.user.projectId
      ).then((respond2)=>{
        // Create stf_nums accoring to STFModel
        stf_num = respond2 + respond.toString();
        return stf_num;
      })
      .catch((err)=>{
        throw new Error("Project Code Name Cant Get It : ",err)
      })
    }).catch((err)=>{
      throw new Error("Last STFNums Cant Get : ", err)
    })
    return stf_num;
  }

  // Get Last Nums and Add +1  stf_nums table and return last stf_nums
  static async #getLastNumsAddAndCreateSTFNums(projectId) {
    const last = await sequelize.query(
      STFQueries.createSTFNUMSAndReturn(projectId)
    );
    return last[0][0]["stf_nums"];
  }

  // Get Projectcode_name
  static async #getProjectCodeName(projectId) {
    const result = await ProjectModel.findAll({
      where: {
        id: projectId,
      },
    });
    return result[0].dataValues.code_name;
  }

  // Create Each Row For STF
  static async #createEachRow(data, each) {
    return await STFModel.create({
      stf_num: data.stf_num,
      projectId: data.user.projectId,
      userId: data.user.id,
      departmentId: data.user.departmentId,
      material_type: each.material_type,
      material_name: each.material_name,
      material_amount: each.material_amount,
      material_unit: each.material_unit,
      fieldId: each.fieldId,
    })
      .then((respond) => {
        return respond;
      })
      .catch(async(err) => {

        await this.#deleteLastSTFNums(data.user.projectId, data.stf_num.slice(-4));
        await this.#deleteLastSTFModelRows(data.user.projectId, data.stf_num);
        throw new EmptyFieldError(err.message, 400);
      });
  }

  // If Error Happen, Delete Last Created STF nums by current user
  static async #deleteLastSTFNums(projectId, stf_num){
    const result = await sequelize.query(STFQueries.deleteSTFNumFromSTFNums(projectId, stf_num))
    .then((respond)=>{})
    .catch((err)=>{
      throw new Error(`Error Delete After Create STF Numm from stf_nums table ${err}`);
    })
    return result;
  }

  // If Error Happen, Delete Last Created Rows From STF_Models accoring to STF nums
  static async #deleteLastSTFModelRows(projectId, stf_num){
    const result = await sequelize.query(STFQueries.deleteSTFNumFromSTFRows(projectId, stf_num))
    .then((respond)=>{})
    .catch((err)=>{
      throw new Error(`Error Delete After Create STF Rows from stf_models table ${err}`);
    })
    return result;
  }

  // Check Validation for importing data
  static #checkValidation(data) {
    if (!data.user.projectId)throw new EmptyFieldError("Project Cant Be null", 400);
    if (!data.user.id) throw new EmptyFieldError("User Cant Be null", 400);
    if (!data.user.departmentId)throw new EmptyFieldError("Department Cant Be null", 400);
    if (data.orders.length === 0)throw new EmptyFieldError("Orders Must Be At Least 1 Order", 400);
    for (let i = 0; i < data.orders?.length; i++) {
      if (!data.orders[i].material_type)
        throw new EmptyFieldError(
          `Material Type Must Be Defined in ${i + 1} Row`, 400
        );
      if (!data.orders[i].material_name)
        throw new EmptyFieldError(
          `Material Name Must Be Defined in ${i + 1} Row`, 400
        );
      if (!data.orders[i].material_amount)
        throw new EmptyFieldError(
          `Material Amount Must Be Defined in ${i + 1} Row`, 400
        );
      if (!data.orders[i].material_unit)
        throw new EmptyFieldError(
          `Material Unit Must Be Defined in ${i + 1} Row`, 400
        );
      if (!data.orders[i].fieldId)
        throw new EmptyFieldError(
          `Material Field Must Be Defined in ${i + 1} Row`, 400
        );
      data.orders[i].material_type = data.orders[i].material_type.trim();
      data.orders[i].material_name = data.orders[i].material_name.trim();
      data.orders[i].material_unit = data.orders[i].material_unit.trim();
      if (data.orders[i].material_type === "")
        throw new EmptyFieldError("Material Type Cant Be Empty", 400);
      if (data.orders[i].material_name === "")
        throw new EmptyFieldError("Material Name Cant Be Empty", 400);
      if (data.orders[i].material_amount <= 0)
        throw new EmptyFieldError("Material AMount Cant Be Zero", 400);
      if (data.orders[i].material_unit === "")
        throw new EmptyFieldError("Material Unit Cant Be Empty", 400);
      if (data.orders[i].fieldId === 0)
        throw new EmptyFieldError("Field Cant Be Empty", 400);
    }
  }

}

// Set New STF Notification  
class CreateNewSTFNotification {

  // Set New STF Notification 
  static async createNewSTFNotification(projectId, data){

    // 1 - Find All Procurement and Warehouse Users
    const result = await this.#findProWarehouseUsers(projectId)
    
    // 2 - Create NewSTFNotification Model
    // - Selecting Users have
    if(result.length){
      // Iterate Users
      for(let i = 0 ; i < result.length; i++){
        // Create and Save Users To NewSTFNotificationModels
        const new_notification = await NewSTFNotificationModel.create({
          read: false,
          stfno: data.stf_num,
          createUserId: data.create_user_id,
          notifyUserId: result[i].id
        });
      }
    }
    // Step 3 Emit that function
    const io = getSocketInstance();
    io.emit('createstf');
    
  }

  // Find Procurement and Warehouse Users
  static async #findProWarehouseUsers(projectId) {

    // Cretae Query and return procuremnt and warehouse users
    const string_query = `select id, name || ' ' || surname as username from users_models where "projectId" = ${projectId} and  "departmentId" in (2,3)`

    // Find From Users  
    const result = await sequelize.query(string_query);
    console.log('notification res is : ',result[0]);
    return result[0];

  }

}

class FetchUserSTF {
  // Get User STF All
  static async fetchUserSTFAll(user_id) {
    const res = await sequelize.query(STFQueries.fetchUserSTFAll(user_id));
    return res[0];
  }
}

class FetchWarehouseData {
  static async fetchWarehouseDataForUser(user_id) {
    const string_query = STFQueries.fetchUserWarehouseData(user_id);
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class FetchProvidedData {
  static async fetchProvidedDataForUser(department_id) {
    const string_query = STFQueries.fetchUserProvidedData(department_id);
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

module.exports = {
  STFServiceCreate,
  FetchUserSTF,
  FetchWarehouseData,
  FetchProvidedData,
};

// const res = await STFModel.findAll({
//   attributes: [
//     "stf_num",
//     "material_type",
//     "material_name",
//     "material_amount",
//     "material_unit",
//     "createdAt"
//   ],
//   where: {
//     userId: user_id,
//   },
//   include: [
//     {
//       attributes: ["email","name","surname"],
//       model: UserModel,
//       required: false,
//     },
//     {
//       attributes: ["field_name"],
//       model: FieldsModel,
//       required: false,
//     },
//   ],
// });
