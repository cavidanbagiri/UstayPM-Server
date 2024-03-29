const moment = require("moment");
const {
  sequelize,
  ProjectModel,
  SMModel,
  ConditionModel,
} = require("../../models");

const ProcurementQueries = require("../queries/procurement.queries");
const EmptyFieldError = require("../exceptions/EmptyFieldError");
const WhereQuery = require("../utils/whereQuery");

// Fetch All STF
class ProcurementServiceFetchSTF {
  // Fetch All STF
  static async fetchSTF(project_id, user_id) {
    const string_query = ProcurementQueries.select_all_stf_query(project_id, user_id);
    const result = await sequelize.query(string_query);
    return result[0];
  }
}


class ProcurementServiceFetchSM {
  static async fetchSM(project_id) {
    const string_query = ProcurementQueries.select_all_sm_query + ` where sm_models."projectId" = ${project_id}  order by "createdAt" desc`;
    const result = await sequelize.query(string_query);
    return result[0];
  }
}

// Create SM
class ProcurementServiceCreateSM {
  // Create SM
  static async createSM(data) {

    // --------------------------------------------------- 1 Step - Check Validation
    try {
      this.#checkValidation(data);
    } catch (err) {
      throw new Error(err);
    }
    
    if (data.length) {
      
      // Take Project Id
      const projectId = data[0].project_id;
      
      // --------------------------------------------------- 2 Step - Create SM Num
      // Create SM_Num form
      const sm_num = await this.#createSMNumForm(projectId);

      // Create SM Model
      for (let i of data) {
        // --------------------------------------------------- 3 Step - Create SM Model 
        const result = await this.#createSMDataModel(sm_num, i)
        .then(async (respond) => {
            // --------------------------------------------------- 4 Step - Create Condition Model 
            await this.#createConditionModelSM(respond.dataValues); 
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    }
    return "OK";
  }

  // Check Validation For Importing SMS
  static #checkValidation(data) {
    for (let i of data) {
      if (!i.stfId) throw new EmptyFieldError("STF Is Not Defined", 400);
      else if (!i.project_id)
        throw new EmptyFieldError("Project Is Not Defined", 400);
      else if (!i.department_id)
        throw new EmptyFieldError("Department Is Not Defined", 400);
      else if (!i.VendorModelId)
        throw new EmptyFieldError("Vendor Is Not Defined ", 400);
      else if (!i.supplierName)
        throw new EmptyFieldError("Supplier Name Is Not Defined", 400);
      else if (!i.sm_material_name)
        throw new EmptyFieldError("Material Name Is Not Defined", 400);
      else if (!i.sm_material_amount)
        throw new EmptyFieldError("Material Amount Is Not Defined", 400);
      else if (!i.sm_material_unit)
        throw new EmptyFieldError("Supplier Unit Is Not Defined", 400);
      else if (!i.price) throw new EmptyFieldError("Price Is Not Defined", 400);
      else if (!i.currency)
        throw new EmptyFieldError("Currency Is Not Defined", 400);
      i.sm_material_name = i.sm_material_name.trim();
      i.sm_material_unit = i.sm_material_unit.trim();
      if (i.sm_material_name === "")
        throw new EmptyFieldError("Material Name Is Not Defined", 400);
      else if (i.sm_material_unit === "")
        throw new EmptyFieldError("Material Name Is Not Defined", 400);
      else if (i.sm_material_amount <= 0)
        throw new EmptyFieldError("Material Amount Is Not Defined", 400);
    }
  }

  // Create SM num form
  static async #createSMNumForm(projectId) {
    // Create sm_num
    const num = await this.#getLastNumsAddAndCreateSMNums(projectId);
    // Get Project Code Name
    const project_code_name = await this.#getProjectCodeName(projectId);
    // Add creating sm_num to data
    const sm_num = project_code_name + "SMS." + num;
    return sm_num;
  }

  // Create sm_num for new sms
  static async #getLastNumsAddAndCreateSMNums(projectId) {
    const last = await sequelize.query(
      ProcurementQueries.createSMSNUMSAndReturn(projectId)
    );
    return last[0][0]["sms_nums"];
  }

  // Get Project Code Name
  static async #getProjectCodeName(projectId) {
    const result = await ProjectModel.findAll({
      where: {
        id: projectId,
      },
    });
    return result[0]?.dataValues?.code_name;
  }

  // Delete Last SM num if error happen
  static async #deleteLastSMNum(sm_num, projectId){
    const result = await sequelize.query(ProcurementQueries.deleteSMNum(sm_num, projectId))
    .then((respond)=>{})
    .catch((err)=>{
      console.log('Delete Error SM num : ',err);
    })
    return result;
  }

  // Delete creating sm models with same sm_nums
  static async #deleteLastSMModelRow(sm_num){
    const result = await sequelize.query(ProcurementQueries.deleteSMModel(sm_num))
    .then((respond)=>{})
    .catch((err)=>{
      console.log('Delete Error SM Model : ',err);
    })
    return result;
  }

  // Create SM Data Model
  static async #createSMDataModel(sm_num, each) {
    // Change Procurement Date time to database with moment js
    const result = await SMModel.create({
      sm_num: sm_num,
      sm_material_name: each.sm_material_name,
      sm_material_amount: each.sm_material_amount,
      sm_material_unit: each.sm_material_unit,
      price: each.price,
      total: each.total,
      currency: each.currency,
      left_over: each.sm_material_amount,
      projectId: each.project_id,
      departmentId: each.department_id,
      vendorId: each.VendorModelId,
      supplierId: each.supplierName,
      stfId: each.stfId,
      approximate_date: each.ProcurementComingDate,
      createdBy: each.createdBy
    })
    .then((respond)=>{
      return respond;
    })
    .catch(async(err)=>{
      // Delete Last Create sm_nums
      await this.#deleteLastSMNum(sm_num.slice(-5), each.project_id);
      // Delere Last Create SMModels Row
      await this.#deleteLastSMModelRow(sm_num);
      throw new EmptyFieldError('New SMS Cant Create', 400);
    })
    return result;
  }

  // Create Condition Model For Each SM ID
  static async #createConditionModelSM(respond) {
    const result = await ConditionModel.create({
      smId: respond.id,
      situationId: 1,
      projectId: respond.projectId,
    });
  }

}


module.exports = {
  ProcurementServiceFetchSTF,
  ProcurementServiceCreateSM,
  ProcurementServiceFetchSM,
};
