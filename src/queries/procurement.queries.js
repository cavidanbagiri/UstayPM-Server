class ProcurementQueries {

  // Fetch All STF 
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount as amount, stf_models.material_unit as unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  Initcap(concat(users_models.name , ' ', users_models.surname))  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId" 
  where stf_models.id not in ( select "stfId" from canceledstf_models)
  order by "createdAt" desc
  `;

  // Fetch All STF 
  static select_all_sm_query = `
  select sm_models.id as sm_id, sm_models."stfId" as stf_id, sm_models.sm_num, stf_models.stf_num, situation_models.status_name as situation, sm_models.sm_material_name,
  sm_models.sm_material_amount as amount, sm_models.sm_material_unit as unit, sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date,
  sm_models."createdAt", sm_models."projectId" as project_id, sm_models."departmentId" as department_id,
  Initcap(concat(users_models.name , ' ', users_models.surname))  as orderer,
  users_models.id as orderer_id,
  Initcap(concat(um.name, ' ', um.surname )) as supplier,
  vendors_models.vendor_name
  from sm_models
  left join stf_models on sm_models."stfId"=stf_models.id
  left join users_models on users_models.id = stf_models."userId"
  left join users_models as um on um.id = sm_models."supplierId"
  left join conditions_models on conditions_models."smId" = sm_models.id
  left join situation_models on situation_models.id =  conditions_models."situationId"
  left join vendors_models on sm_models."vendorId" = vendors_models.id
  `;
  
  // Create new stf num and add to stfmodel
  static createSMSNUMSAndReturn(projectId) {
    const create_sms_nums_and_return = `
    INSERT INTO sms_nums(sms_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select sms_nums from sms_nums order by id DESC limit 1),${projectId}, current_timestamp, current_timestamp ) returning sms_nums
  `;
    return create_sms_nums_and_return;
  }

  // Delete sm_num 
  static deleteSMNum(sm_num, projectId) {
    const string_query = `delete from sms_nums where sms_nums = ${sm_num} and "projectId" = ${projectId} `;
    return string_query;
  }

  // Delete sm_num 
  static deleteSMModel(sm_num, projectId) {
    const string_query = `delete from sm_models where sm_num = '${sm_num}' `;
    return string_query;
  }

}

module.exports = ProcurementQueries;
