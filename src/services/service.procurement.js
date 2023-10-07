

const { sequelize, ProjectModel, SMModel, ConditionModel } = require('../../models');

const ProcurementQueries = require('../queries/procurement.queries');

// Fetch All STF
class ProcurementServiceFetchSTF {

  // Fetch All STF
  static async fetchSTF(){
    const string_query = ProcurementQueries.select_all_stf_query;
    const result = await sequelize.query(string_query);
    return result[0];
  }

}

class ProcurementServiceFetchSM {
  static async fetchSM () {
    const string_query = ProcurementQueries.select_all_sm_query;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

// Create SM
class ProcurementServiceCreateSM {

  // Create SM 
  static async createSM(data){
    if(data.length){
      // Take Project Id
      const projectId = data[0].project_id;
      // Create SM_Num form
      const sm_num = await this.#createSMNumForm(projectId);
      // Create SM Model
      for(let i of data){
        const result = await this.#createSMDataModel(sm_num, i)
        .then(async(respond)=>{
          await this.#createConditionModelSM(respond.dataValues)
        }).catch((err)=>{
          console.log("Create New SM Error : ", err);
          throw new Error(err);
        })
      }
    }

    return 'OK';
  }

  // Create SM num form
  static async #createSMNumForm(projectId) {
    // Create sm_num
    const num = await this.#getLastNumsAddAndCreateSMNums(projectId);
    // Get Project Code Name
    const project_code_name = await this.#getProjectCodeName(projectId);
    // Add creating sm_num to data
    const sm_num = project_code_name+'SMS.'+num;
    return sm_num;
  }

  // Create sm_num for new sms
  static async #getLastNumsAddAndCreateSMNums(projectId){
    const last = await sequelize.query(ProcurementQueries.createSMSNUMSAndReturn(projectId));
    // console.log('last',last);
    return last[0][0]["sms_nums"];
    // return 'cavidan'
  }

  // Get Project Code Name
  static async #getProjectCodeName(projectId){
    const result = await ProjectModel.findAll({
      where: {
        id: projectId,
      },
    });
    return result[0].dataValues.code_name;
  }

  // Create SM Data Model
  static async #createSMDataModel(sm_num, each){
    const result = await SMModel.create({
      sm_num: sm_num,
      sm_material_name: each.sm_material_name,
      sm_material_amount:each.sm_material_amount,
      sm_material_unit: each.sm_material_unit,
      price: each.price,
      total: each.total,
      currency: each.currency,
      left_over: each.sm_material_amount,
      approximate_date: '2023-05-10',
      projectId: each.project_id,
      departmentId:each.department_id,
      vendorId: each.VendorModelId,
      supplierId: each.supplierName,
      stfId: each.stfId,
    })
    return result;
  }

  // Create Condition Model For Each SM ID
  static async #createConditionModelSM(respond) {

    const result = await ConditionModel.create({
      smId: respond.id,
      situationId: 1,
      projectId: respond.projectId
    })

  }

}

// Fetch All Companies
class ProcurementServiceFetchCompanies{
  // Fetch All Companies
  static async fetchCompanies() {
    const result = await sequelize.query(ProcurementQueries.select_companies);
    return result[0];
  }
}

// Fetch All Companies
class ProcurementServiceFetchProcurementUsers{
  // Fetch Procurement Users
  static async fetchProcurementUsers () {
    const result = await sequelize.query(ProcurementQueries.select_procurement_users);
    return result[0];
  }
}


module.exports = {
  ProcurementServiceFetchSTF,
  ProcurementServiceFetchCompanies,
  ProcurementServiceFetchProcurementUsers,
  ProcurementServiceCreateSM,
  ProcurementServiceFetchSM
}