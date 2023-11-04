class CommonQueries {
  // Fetch All STF
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount, stf_models.material_unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  concat(users_models.name , ' ', users_models.surname)  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  `;

  // Fetch All SM
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

  // Fetch Data From Warehouse
  static received_sms_from_warehouse_query = `
  select sm_models.id as sm_id, sm_models.sm_num, stf_models.stf_num, warehouse_models.delivery_material_name as material_name, warehouse_models.id as warehouse_id, 
  warehouse_models.delivery_material_amount as amount, warehouse_models.stock, warehouse_models.delivery_material_unit as unit,
  sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, 
  warehouse_models."createdAt", sm_models."projectId" as project_id, sm_models."departmentId" as department_id,
  concat(users_models.name , ' ', users_models.surname)  as orderer,
  concat(um.name, ' ', um.surname ) as supplier,
  vendors_models.vendor_name
  from warehouse_models
  left join sm_models on warehouse_models."smId" = sm_models.id 
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
  
  // Fetch Department
  static fetch_departments = `
    select id, department_name from department_models
  `

  // Fetch stf_row_inform 
  static fetch_stf_row_inform = `
  SELECT stf_models.id as stf_id, stf_models.stf_num, stf_models.material_type, stf_models.material_name, stf_models.material_amount,
  stf_models.material_unit, stf_models.material_link, stf_models.material_comment, stf_models.completed, stf_models."createdAt",
  CONCAT(users_models.name, ' ', users_models.surname) as Ordered_by, 
  department_models.department_name,
  fields_models.field_name,
  sm_models.sm_num, sm_models.sm_material_name, sm_models.sm_material_amount, sm_models.sm_material_unit, sm_models.price,
  sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date, sm_models."createdAt",
  vendors_models.vendor_name,
  warehouse_models.delivery_material_name, warehouse_models.delivery_material_amount, warehouse_models.delivery_material_unit,
  warehouse_models.delivery_material_price, warehouse_models.delivery_material_total, warehouse_models.delivery_material_currency,
<<<<<<< HEAD
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock,
=======
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock, 
>>>>>>> ac67b20fdf0860bc0610131227920fdd51fdd63e
  CONCAT(us_mod.name, ' ', us_mod.surname) as Supplier_name,
  CONCAT(u_m.name, ' ',u_m.surname) as Accepted_by
  FROM stf_models 
  LEFT JOIN users_models ON  stf_models."userId" = users_models.id
  LEFT JOIN department_models ON stf_models."departmentId"=department_models.id
  LEFT JOIN fields_models ON stf_models."fieldId" = fields_models.id
  LEFT JOIN sm_models ON sm_models."stfId" = stf_models.id
  LEFT JOIN vendors_models ON sm_models."vendorId" = vendors_models.id
  LEFT JOIN users_models as us_mod ON sm_models."supplierId" = us_mod.id
  LEFT JOIN warehouse_models ON warehouse_models."smId" = sm_models.id
  LEFT JOIN users_models as u_m ON warehouse_models."acceptedBy" = u_m.id
  WHERE stf_models.id = 
  
  `

}

module.exports = CommonQueries;
