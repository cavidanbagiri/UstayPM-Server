class CommonQueries {
  // Fetch All STF
  static select_all_stf_query = `
  select stf_models.id as stf_id, stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount as amount,
  stf_models.material_unit as unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  INITCAP(concat(users_models.name , ' ', users_models.surname))  as username, fields_models.field_name
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  left join fields_models on fields_models.id = "fieldId"
  `;


  static select_all_sm_query = `
  select sm_models.id as sm_id, sm_models."stfId" as stf_id, sm_models.sm_num, stf_models.stf_num, situation_models.status_name as situation, sm_models.sm_material_name,
  sm_models.sm_material_amount as amount, sm_models.sm_material_unit as unit, sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date,
  sm_models."createdAt", sm_models."projectId" as project_id, sm_models."departmentId" as department_id,
  Initcap(concat(users_models.name , ' ', users_models.surname))  as orderer,
  Initcap(concat(um.name, ' ', um.surname )) as supplier,
  vendors_models.vendor_name
  from sm_models
  left join stf_models on sm_models."stfId"=stf_models.id
  left join users_models on users_models.id = stf_models."userId"
  left join users_models as um on um.id = sm_models."supplierId"
  left join conditions_models on conditions_models."smId" = sm_models.id
  left join situation_models on situation_models.id =  conditions_models."situationId"
  left join vendors_models on sm_models."vendorId" = vendors_models.id
  `

  // Fetch Data From Warehouse
  static received_sms_from_warehouse_query = `
  select sm_models.id as sm_id, sm_models.sm_num, stf_models.stf_num, warehouse_models.delivery_material_name as material_name, warehouse_models.id as warehouse_id, 
  warehouse_models.delivery_material_amount as amount, warehouse_models.stock, warehouse_models.delivery_material_unit as unit,
  sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, 
  warehouse_models."createdAt", sm_models."projectId" as project_id, sm_models."departmentId" as department_id,
  INITCAP(concat(users_models.name , ' ', users_models.surname))  as orderer,
  INITCAP(concat(um.name, ' ', um.surname )) as supplier,
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

  // Fetc Provided Data
  static fetch_provide_data = `
    select sm_models.sm_num, sm_models.sm_material_name as material_name, provided_models.provided_amount as amount, sm_models.sm_material_unit as unit, 
    provided_models.provided_date, provided_models.serial_no, provided_models.unique_id, provided_models.deliver_to, provided_models.card_number
    from provided_models
    left join warehouse_models on provided_models."warehouseId" = warehouse_models.id
    left join sm_models on warehouse_models."smId" = sm_models.id
  `;

  // Fetch All Companies
  static select_companies = `
    SELECT id as company_id, vendor_name  FROM vendors_models
  `

  // Fetch All Procurement Users
  static select_procurement_users = `
    select id as user_id, INITCAP(concat(name, ' ', surname)) as procurement_users from users_models where "departmentId" = 2
  `;

  // Fetch All Procurement Users
  // static select_stf_created_users_names = `
  // select id, INITCAP(concat(name, ' ', surname)) as ordered_name from users_models
  // `;
  static select_stf_created_users_names = `
    select users_models.id,  count(distinct(stf_num)) as stf_data, 
    INITCAP(concat(users_models.name, ' ', users_models.surname )) as ordered_name
    from stf_models
    left join users_models on users_models.id = stf_models."userId"
    where
    stf_models."userId" in ( select distinct "userId" from stf_models )
    group by "userId", users_models.name, users_models.surname, users_models.id
  `;
  
  // Fetch Department
  static fetch_departments = `
    select id, department_name from department_models
  `

  // Fetch stf_row_inform 
  static fetch_stf_row_inform = `
  SELECT stf_models.id as stf_id, stf_models.stf_num, stf_models.material_type, stf_models.material_name, stf_models.material_amount,
  stf_models.material_unit, stf_models.material_link, stf_models.material_comment, stf_models.completed, stf_models."createdAt",
  INITCAP(CONCAT(users_models.name, ' ', users_models.surname)) as Ordered_by, 
  department_models.department_name,
  fields_models.field_name,
  sm_models.sm_num, sm_models.sm_material_name, sm_models.sm_material_amount, sm_models.sm_material_unit, sm_models.price,
  sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date, sm_models."createdAt",
  vendors_models.vendor_name,
  warehouse_models.delivery_material_name, warehouse_models.delivery_material_amount, warehouse_models.delivery_material_unit,
  warehouse_models.delivery_material_price, warehouse_models.delivery_material_total, warehouse_models.delivery_material_currency,
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock,
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock, 
  INITCAP(CONCAT(us_mod.name, ' ', us_mod.surname)) as Supplier_name,
  INITCAP(CONCAT(u_m.name, ' ',u_m.surname)) as Accepted_by
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

  static get_stf_statistic_result = 'SELECT completed, count(completed) from stf_models group by completed'
  static get_sm_statistic_result = 'select status_name, count("situationId") from conditions_models left join situation_models on conditions_models."situationId" = situation_models.id group by "situationId", status_name'
  static get_warehouse_statistic_result = ' select count(id) from warehouse_models where stock <> 0'
  static get_new_stf_notification_result = `
    select stfno, Initcap(Concat(users_models.name, ' ', users_models.surname )) as username, new_stf_notification_models."createdAt" from new_stf_notification_models 
    left join users_models on new_stf_notification_models."createUserId" = users_models.id
    where read=false and "notifyUserId" = 
  `
  static read_notification = `
    update new_stf_notification_models set read = true where read = false and "notifyUserId" = 
  `
  
  // static fetchMessageQuery(current_id, selected_id){
  //   const  fetch_message = `
  //     SELECT "roomId", "receiverId", "senderId", message_text, "createdAt" from message_models
  //     where  ("receiverId" = ${current_id} and "senderId" = ${selected_id}) or ("receiverId" = ${selected_id} and "senderId" = ${current_id}) 
  //   `
  //   return fetch_message;
  // }
  static fetchMessageQuery(room_id){
    const  fetch_message = `
      SELECT "roomId", "receiverId", "senderId", message_text, "createdAt" from message_models
      where  "roomId" = ${room_id}
    `
    return fetch_message;
  }

  
  // Fetch All Users
  static fetch_all_users = `
    SELECT users_models.id, users_models.id-users_models.id as count, INITCAP(concat(users_models.name , ' ', users_models.surname)) as username,
    department_models.department_name,
    status_models.status_name 
    from users_models
    LEFT JOIN department_models on users_models."departmentId" = department_models.id
    LEFT JOIN status_models on users_models."statusId" = status_models.id 
  `

  static fetchUnreadMessages(user_id) {
    const string_query = `
    select "receiverId" as id, count("receiverId"),room_models.id as roomId, 
    INITCAP(concat(users_models.name , ' ', users_models.surname))  as username,
    status_models.status_name 
    from message_models
    left join users_models on users_models.id = "receiverId"
    LEFT JOIN department_models on users_models."departmentId" = department_models.id
    LEFT JOIN status_models on users_models."statusId" = status_models.id 
    left join room_models on message_models."roomId"=room_models.id
    where "senderId" = ${user_id} and read = false
    group by "receiverId", users_models.name, users_models.surname, department_models.department_name, status_models.status_name, room_models.id
    
    `
    return string_query;
  }

  static set_reading_messages_true = `
    update message_models set read = true where read = false and "roomId" =  
  `

  static filterVendorName(selected_text){
    return `SELECT id, vendor_name from vendors_models where vendor_name ILIKE '%${selected_text}%'`; 
  }

  // static selected_text_vendor_name = `
  //   SELECT id, vendor_name from vendors_models where vendor_name LIKE % 
  // `

}

module.exports = CommonQueries;
