const {
  sequelize,
  STFModel,
  ProjectModel
} = require("../../models");
const STFQueries = require("../queries/stf_queries");

// Create STF Class
class STFServiceCreate {
  // Create STF
  static async createSTF(data) {
    data.stf_num = await this.#createSTFNUMSForm(data);

    for (let i of data.orders) {
      await this.#createEachRow(data, i);
    }

    return "OK";
  }

  // Get Last Nums and Add +1  stf_nums table and return last stf_nums
  static async #getLastNumsAddAndCreateSTFNums(projectId) {
    const last = await sequelize.query(
      createSTFNUMSAndReturn
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