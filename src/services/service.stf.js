const { sequelize, STFModel, ProjectModel } = require("../../models");
const STFQueries = require("../queries/stf_queries");
const EmptyFieldError = require("../exceptions/EmptyFieldError");
const WhereQuery = require("../utils/whereQuery");

// Create STF Class
class STFServiceCreate {
  // Create STF
  static async createSTF(data) {
    // Validate All Column that, Each row and common information is true || not
    try {
      this.#checkValidation(data);
    } catch (err) {
      throw new Error(err)
    }

    // Set STF Num inside of data and insert to table -> SRU.RS.07.10003
    data.stf_num = await this.#createSTFNUMSForm(data);
    for (let i of data.orders) {
      await this.#createEachRow(data, i);
    }
    return "OK";
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

  // Return stf_nums form for STFModel
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
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  // Check Validation for importing data
  static #checkValidation(data) {
    if (!data.user.projectId)
      throw new EmptyFieldError("Project Cant Be null", 400);
    if (!data.user.id) throw new EmptyFieldError("User Cant Be null", 400);
    if (!data.user.departmentId)
      throw new EmptyFieldError("Department Cant Be null", 400);
    if (data.orders.length === 0)
      throw new EmptyFieldError("Orders Must Be At Least 1 Order", 400);
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

class FetchUserSTF {
  // Get User STF All
  static async fetchUserSTFAll(user_id) {
    const res = await sequelize.query(STFQueries.fetchUserSTFAll(user_id));
    return res[0];
  }
}

class FilterSTF {
  // Filter User STF
  static async filterSTF(query) {
    const where_query = WhereQuery.userSTFWhereQuery("", query, "stf_models");
    const string_query = `
    ${STFQueries.stf_user_filter_query}
      WHERE  ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class FilterSTFWarehouseData {
  // Filter User STF
  static async filterSTFWarehouseData(query) {
    const where_query = WhereQuery.userWarehouseWhereQuery(
      "",
      query,
      "warehouse_models"
    );
    const string_query = `
    ${STFQueries.stf_user_filter_query_warehouse_data}
      WHERE  ${where_query}
    `;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

class FetchWarehouseData {
  static async fetchWarehouseDataForUser(user_id) {
    const string_query = STFQueries.fetchUserWarehouseData(user_id);
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

module.exports = {
  STFServiceCreate,
  FetchUserSTF,
  FilterSTF,
  FetchWarehouseData,
  FilterSTFWarehouseData,
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
