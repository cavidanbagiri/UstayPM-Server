class CommonQueries {
  // Fetch All STF
  static select_all_stf_query = `
  select stf_models.id as stf_id, users_models.id as user_id, stf_models."projectId" as project_id, starred_models.id as starred_id,
  stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_amount as amount,
  stf_models.material_unit as unit, stf_models."createdAt", stf_models."projectId" as project_id, stf_models."departmentId" as department_id,
  INITCAP(concat(users_models.name , ' ', users_models.surname))  as username, fields_models.field_name
  from stf_models
  left join users_models on users_models.id = stf_models."userId"
  left join fields_models on fields_models.id = "fieldId"
  left join starred_models on starred_models."stfId" = stf_models.id
  `;


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
  `

  // Fetch Data From Warehouse
  static received_sms_from_warehouse_query = `
  select sm_models.id as sm_id, sm_models.sm_num, stf_models.id as stf_id, stf_models.stf_num, warehouse_models.delivery_material_name as material_name, warehouse_models.id as warehouse_id, 
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
  select provided_models.id as provided_id, provided_models."warehouseId" as warehouse_id, 
  sm_models.sm_num, stf_models.id as stf_id, sm_models.sm_material_name as material_name, provided_models.provided_amount as amount, sm_models.sm_material_unit as unit, 
  warehouse_delivery_types.type_name, provided_models.provided_date, provided_models.serial_no, provided_models.unique_id, provided_models.deliver_to, provided_models.card_number,
  provided_models.return_date, INITCAP(concat(users_models.name, ' ', users_models.surname )) as returned_by
  from provided_models
  left join warehouse_models on provided_models."warehouseId" = warehouse_models.id
  left join sm_models on warehouse_models."smId" = sm_models.id
  left join stf_models on sm_models."stfId" = stf_models.id
  left join warehouse_delivery_types on provided_models."typeId" = warehouse_delivery_types.id
  left join users_models on provided_models."returnbyId" = users_models.id
  `;

  // Fetch Warehouse Delivery Types
  static fetch_warehouse_delivery_types = `
    select id, type_name from warehouse_delivery_types 
  `

  // Fetch All Procurement Users
  static select_procurement_users = `
    select id as user_id, INITCAP(concat(name, ' ', surname)) as procurement_users from users_models where "departmentId" = 2
  `;

  // Fetch All Procurement Users
  // static select_stf_created_users_names = `
  // select id, INITCAP(concat(name, ' ', surname)) as ordered_name from users_models
  // `;
  static select_stf_created_users_names (project_id) {
    return `
    select users_models.id,  count(distinct(stf_num)) as stf_data, 
    INITCAP(concat(users_models.name, ' ', users_models.surname )) as ordered_name
    from stf_models
    left join users_models on users_models.id = stf_models."userId"
    where stf_models."projectId" = ${project_id} and
    stf_models."userId" in ( select distinct "userId" from stf_models )
    group by "userId", users_models.name, users_models.surname, users_models.id
  `
  }
  
  // Fetch Department
  static fetch_departments = `
    select id, department_name from department_models
  `

  // Fetch STF Data For Home Page
  // static fetch_stf_data (project_id){
  //   return `
  //   select stf_models.id as stf_id, stf_num,  material_name, material_amount as amount, 
  //     material_unit as unit, 
  //     Initcap(concat(users_models.name, ' ', users_models.surname) ) as username, 
  //     users_models.image_url,
  //     canceledstf_models."stfId" as canceled_id
  //     from stf_models
  //     left join users_models on stf_models."userId" = users_models.id
  //     left join canceledstf_models on stf_models.id = canceledstf_models."stfId" 
  //     where stf_models."projectId" = ${project_id}
  //     order by stf_models.id DESC
  //     limit 20
  //   `
  // } 
  static fetch_stf_data (project_id){
    return `
    select stf_models.id as stf_id, stf_num,
      Initcap(concat(users_models.name, ' ', users_models.surname) ) as created_by, 
      users_models.image_url,
      stf_models."createdAt" as created_date,
      canceledstf_models."stfId" as canceled_id
      from stf_models
      left join users_models on stf_models."userId" = users_models.id
      left join canceledstf_models on stf_models.id = canceledstf_models."stfId" 
      where stf_models."projectId" = ${project_id}
      order by stf_models.id DESC
      limit 20
    `
  } 

  // Fetch stf_row_inform 
  static fetch_stf_row_inform = `
  SELECT stf_models.id as stf_id, stf_models.stf_num, stf_models.material_type, stf_models.material_name, stf_models.material_amount,
  stf_models.material_unit, stf_models.material_link, stf_models.material_comment, stf_models.completed, stf_models."createdAt" as stf_createdAt,
  INITCAP(CONCAT(users_models.name, ' ', users_models.surname)) as Ordered_by, 
  department_models.department_name,
  fields_models.field_name,
  sm_models.sm_num, sm_models.sm_material_name, sm_models.sm_material_amount, sm_models.sm_material_unit, sm_models.price,
  sm_models.total, sm_models.currency, sm_models.left_over, sm_models.approximate_date, sm_models."createdAt" as sm_createdAt,
  vendors_models.vendor_name,
  warehouse_models.delivery_material_name, warehouse_models.delivery_material_amount, warehouse_models.delivery_material_unit,
  warehouse_models.delivery_material_price, warehouse_models.delivery_material_total, warehouse_models.delivery_material_currency,
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock,
  warehouse_models.doc_number, warehouse_models.doc_date, warehouse_models.certificate, warehouse_models.passport, warehouse_models.stock, warehouse_models."createdAt" as warehouse_createdAt,
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

  // Statistic Data FOr Showing Each Module and Home page
  static get_stf_statistic_result(project_id) {
    return `SELECT completed, count(completed) from stf_models where "projectId"=${project_id} group by completed`
  }
  static get_canceled_stf_count (project_id){
    return `
      select count(canceledstf_models.id) from canceledstf_models
      left join stf_models on canceledstf_models."stfId" = stf_models.id
      where stf_models."projectId" = ${project_id}
    `;
  }
  static get_sm_statistic_result (project_id) {
    return `
      select status_name, count("situationId") from conditions_models 
      left join situation_models on conditions_models."situationId" = situation_models.id
      where conditions_models."projectId" = ${project_id}
      group by "situationId", status_name
    `
  }
  static get_warehouse_statistic_result (project_id){
    return ` 
    select count(warehouse_models.id) from warehouse_models 
    left join sm_models on warehouse_models."smId" = sm_models.id 
    where stock <> 0 and sm_models."projectId" = ${project_id}
    `;
  }

  // Group Chart Statistic Data
  static group_chart_statistic_data (project_id){
    return `
    select count( distinct stf_num) as stf_count, department_name as department_id from stf_models
    left join department_models on department_models.id = stf_models."departmentId"
    where stf_models."projectId" = ${project_id}
    group by department_models.department_name 
    union
    select department_models.id - department_models.id as stf_count, department_name as department_id from department_models
    where department_models.id not in (select "departmentId" from stf_models)
    `
  }
  
  // Warehouse Stock Chart Statistic Data
  static warehouse_stock_statistic_data (project_id){
    return `
    select distinct stf_models.material_type, count(stf_models.material_type)  from warehouse_models
    left join sm_models on warehouse_models."smId" = sm_models.id
    left join stf_models on sm_models."stfId"=stf_models.id
    where stf_models."projectId" = ${project_id}
    group by stf_models.material_type
    `
  }

  static get_new_stf_notification_result = `
    select new_stf_notification_models.id as notification_id, stfno, Initcap(Concat(users_models.name, ' ', users_models.surname )) as username, new_stf_notification_models."createdAt" from new_stf_notification_models 
    left join users_models on new_stf_notification_models."createUserId" = users_models.id
    where read=false and "notifyUserId" = 
  `

  static get_accept_sm_notification_result = `
  select accept_sm_notification_models.id as notification_id, sm_no, Initcap(Concat(users_models.name, ' ', users_models.surname )) as username, 
  Initcap(Concat(u_m.name, ' ', u_m.surname )) as orderer,
  u_m.id as orderer_id, 
  accept_sm_notification_models."createdAt" 
  from accept_sm_notification_models 
  left join users_models on accept_sm_notification_models."createUserId" = users_models.id
  left join users_models u_m on accept_sm_notification_models."notifyUserId" = u_m.id 
  where read=false and "notifyUserId" =
  `

  static read_and_delete_new_stf_notification (notification_id){
    return `
      delete from new_stf_notification_models where id = ${notification_id} 
    `
  }

  // [ DEPRECATED ]
  // static read_accept_notification (user_id, notification_id){
  //   return `
  //     update accept_sm_notification_models set read = true where id = ${notification_id} 
  //   `
  // }

  // [ After Read Notification, Delete it ]
  static read_and_delete_accept_notification (notification_id){
    return `
      delete from accept_sm_notification_models where id = ${notification_id} 
    `
  }
 
  static fetchMessageQuery(room_id){
    const  fetch_message = `
      SELECT "roomId", "receiverId", "senderId", message_text, "createdAt" from message_models
      where  "roomId" = ${room_id} order by "createdAt"
    `
    return fetch_message;
  }

  static fetchMessagesUnreadCounting(roomid, receiverId){
    const string_query = `
      SELECT count("receiverId") as count, "roomId", "receiverId", "senderId" from message_models
      where  "roomId" = ${roomid} and read = false and "receiverId" = ${receiverId}
      group by read, "roomId", "receiverId", "senderId"
    `
    return string_query;
  }

  
  // Fetch All Users
  static fetch_all_users = `
    SELECT users_models.id, users_models.id-users_models.id as count, INITCAP(concat(users_models.name , ' ', users_models.surname)) as username, users_models.image_url, 
    department_models.department_name,
    status_models.status_name,
    project_models.project_name
    from users_models
    LEFT JOIN department_models on users_models."departmentId" = department_models.id
    LEFT JOIN status_models on users_models."statusId" = status_models.id 
    LEFT JOIN project_models on users_models."projectId" = project_models.id
    `

  static fetchUnreadMessages(user_id) {
    const string_query = `
    select "receiverId" as id, count("receiverId"),room_models.id as roomId, 
    INITCAP(concat(users_models.name , ' ', users_models.surname))  as username,
    users_models.image_url,
    status_models.status_name 
    from message_models
    left join users_models on users_models.id = "receiverId"
    LEFT JOIN department_models on users_models."departmentId" = department_models.id
    LEFT JOIN status_models on users_models."statusId" = status_models.id 
    left join room_models on message_models."roomId"=room_models.id
    where "senderId" = ${user_id} and read = false
    group by "receiverId", users_models.name, users_models.surname, users_models.image_url, department_models.department_name, status_models.status_name, room_models.id
    `
    return string_query;
  }

  static set_reading_messages_true = `
    update message_models set read = true where read = false and "roomId" =  
  `

  // Fetch All Companies
  static select_companies = `
    SELECT id as company_id, vendor_name  FROM vendors_models
  `


  static filterVendorName(selected_text){
    return `SELECT id as company_id, vendor_name from vendors_models where vendor_name ILIKE '%${selected_text}%'`; 
  }

  // static selected_text_vendor_name = `
  //   SELECT id, vendor_name from vendors_models where vendor_name LIKE % 
  // `

}

module.exports = CommonQueries;
