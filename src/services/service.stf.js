const { sequelize, STFNUMS, STFModel, ProjectModel } = require("../../models");
const STFQueries = require("../queries/stf_queries");

class STFServiceCreate {
  // Create STF
  static async createSTF(data) {

    // Temporary Assign Value
    data.projectId = 1;
    data.userId = 1;
    data.departmentId = 1;
    data.fieldsId = 1;
    // Create stf_num form for STFModel
    data.stf_num = this.createSTFNUMSForm(data);

    

  }

  // Get Last Nums and Add +1  stf_nums table and return last stf_nums
  static async #getLastNumsAddAndCreateSTFNums(projectId) {
    const last = await sequelize.query(
      `INSERT INTO stf_nums(stf_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select stf_nums from stf_nums order by id DESC limit 1), ${projectId}, current_timestamp, current_timestamp ) returning stf_nums`
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
    const last_created_stf_num = await this.getLastNumsAddAndCreateSTFNums(data.projectId);
    // Get Project code_name
    const project_code_name = await this.getProjectCodeName(data.projectId);
    // Create stf_nums accoring to STFModel
    let stf_num = project_code_name + last_created_stf_num.toString();
    return stf_num;
  }

}

module.exports = {
  STFServiceCreate,
};
