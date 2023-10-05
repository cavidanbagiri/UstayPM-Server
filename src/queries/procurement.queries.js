class ProcurementQueries {

  // Fetch All STF 
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_unit, stf_models."createdAt",
  concat(users_models.name , ' ', users_models.surname)  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  `;

  // Fetch All Companies
  static select_companies = `
    SELECT id as companieId, vendor_name  FROM vendors_models
  `

  // Fetch All Procurement Users
  static select_procurement_users = `
    select id as userId, concat(name, ' ', surname) as procurement_users from users_models where "departmentId" = 2 or "departmentId" = 4
  `;

  

}

module.exports = ProcurementQueries;
