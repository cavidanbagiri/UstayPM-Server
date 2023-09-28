const { sequelize, STFModel, ProjectModel } = require("../../models");
const STFQueries = require("../queries/stf_queries");
const EmptyFieldError = require("../exceptions/EmptyFieldError");
// Create STF Class
class STFServiceCreate {
  // Create STF
  static async createSTF(data) {
    // Validate All Column that, Each row and common information is true || not
    this.#checkValidation(data);

    // Set STF Num inside of data and insert to table
    data.stf_num = await this.#createSTFNUMSForm(data);

    for (let i of data.orders) {
      await this.#createEachRow(data, i);
    }

    return "OK";
  }

  // Get Last Nums and Add +1  stf_nums table and return last stf_nums
  static async #getLastNumsAddAndCreateSTFNums(projectId) {
    const last = await sequelize.query(STFQueries.createSTFNUMSAndReturn(projectId));
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

  // Return stf_nums form for STFModel
  static async #createSTFNUMSForm(data) {
    // Get Last STFNums value
    const last_created_stf_num = await this.#getLastNumsAddAndCreateSTFNums(
      data.projectId
    );
    // Get Project code_name
    const project_code_name = await this.#getProjectCodeName(data.projectId);
    // Create stf_nums accoring to STFModel
    let stf_num = project_code_name + last_created_stf_num.toString();
    return stf_num;
  }

  // Create Each Row For STF
  static async #createEachRow(data, each) {
    const res = await STFModel.create({
      stf_num: data.stf_num,
      projectId: data.projectId,
      userId: data.userId,
      departmentId: data.departmentId,
      fieldId: data.fieldsId,
      material_type: each.material_type,
      material_name: each.material_name,
      material_amount: each.material_amount,
      material_unit: each.material_unit,
    });
    return res;
  }

  // Check Validation for importing data
  static #checkValidation(data) {
    if (!data.projectId) 
      throw new EmptyFieldError("Project Cant Be null", 400);
    if (!data.userId) 
      throw new EmptyFieldError("User Cant Be null", 400);
    if (!data.departmentId)
      throw new EmptyFieldError("Department Cant Be null", 400);
    if (!data.fieldsId) 
      throw new EmptyFieldError("Fields Cant Be null", 400);
    if (data.orders.length === 0) 
      throw new EmptyFieldError("Orders Must Be At Least 1 Order", 400);
    for (let i = 0; i < data.orders?.length; i++) {
      data.orders[i].material_type = data.orders[i].material_type.trim()
      data.orders[i].material_name = data.orders[i].material_name.trim()
      data.orders[i].material_unit = data.orders[i].material_unit.trim()
      if (data.orders[i].material_type === "")
        throw new EmptyFieldError("Material Type Cant Be Empty", 400);
      if (data.orders[i].material_name === "")
        throw new EmptyFieldError("Material Name Cant Be Empty", 400);
      if (data.orders[i].material_amount <= 0)
        throw new EmptyFieldError("Material AMount Cant Be Zero", 400);
      if (data.orders[i].material_unit === "")
        throw new EmptyFieldError("Material Unit Cant Be Empty", 400);
    }
  }
}

class FetchUserSTF {
  // Get User STF All
  static async fetchUserSTFAll(user_id) {
    const res = await sequelize.query(STFQueries.fetchUserSTFAll(user_id));
    return res[0];
  }
}

module.exports = {
  STFServiceCreate,
  FetchUserSTF,
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
