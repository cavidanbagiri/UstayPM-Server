class ProcurementQueries {

  // Fetch All STF 
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount, stf_models.material_unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  concat(users_models.name , ' ', users_models.surname)  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  `;

  // Fetch All STF 
  static select_all_sm_query = `
  select sm_models.id as sm_id, sm_models."stfId" as stf_id, sm_models.sm_num, stf_models.stf_num, situation_models.status_name as situation, sm_models.sm_material_name,
  sm_models.sm_material_amount, sm_models.sm_material_unit, sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date,
  sm_models."createdAt", sm_models."projectId" as project_id, sm_models."departmentId" as department_id,
  concat(users_models.name , ' ', users_models.surname)  as orderer,
  concat(um.name, ' ', um.surname ) as supplier,
  vendors_models.vendor_name
  from sm_models
  left join stf_models on sm_models."stfId"=stf_models.id
  left join users_models on users_models.id = stf_models."userId"
  left join users_models as um on um.id = sm_models."supplierId"
  left join conditions_models on conditions_models."smId" = sm_models.id
  left join situation_models on situation_models.id =  conditions_models."situationId"
  left join vendors_models on sm_models."vendorId" = vendors_models.id
  `;

  // Fetch All Companies
  static select_companies = `
    SELECT id as company_id, vendor_name  FROM vendors_models
  `

  // Fetch All Procurement Users
  static select_procurement_users = `
    select id as user_id, concat(name, ' ', surname) as procurement_users from users_models where "departmentId" = 2 or "departmentId" = 4
  `;

  // Fetch All Procurement Users
  static select_stf_created_users_names = `
  select id, concat(name, ' ', surname) as ordered_name from users_models
  `;
  
  // Create new stf num and add to stfmodel
  static createSMSNUMSAndReturn(projectId) {
    const create_sms_nums_and_return = `
    INSERT INTO sms_nums(sms_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select sms_nums from sms_nums order by id DESC limit 1),${projectId}, current_timestamp, current_timestamp ) returning sms_nums
  `;
    return create_sms_nums_and_return;
  }

}

module.exports = ProcurementQueries;
