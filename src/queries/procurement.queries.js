class ProcurementQueries {

  // Fetch All STF 
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount, stf_models.material_unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  concat(users_models.name , ' ', users_models.surname)  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  `;

  // Fetch All Companies
  static select_companies = `
    SELECT id as company_id, vendor_name  FROM vendors_models
  `

  // Fetch All Procurement Users
  static select_procurement_users = `
    select id as user_id, concat(name, ' ', surname) as procurement_users from users_models where "departmentId" = 2 or "departmentId" = 4
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
