class WarehouseQueries {

  // Fetch Data From Warehouse
  static received_sms_from_warehouse_query = `
  select sm_models.id as sm_id, sm_models.sm_num,sm_models.price, sm_models.total, sm_models.currency, sm_models.left_over, sm_models."departmentId" as department_id,
  stf_models.id as stf_id, stf_models.stf_num,
  warehouse_models.delivery_material_name as material_name, warehouse_models.id as warehouse_id, 
  warehouse_models.delivery_material_amount as amount, warehouse_models.stock, warehouse_models.delivery_material_unit as unit, 
  warehouse_models."createdAt", sm_models."projectId" as project_id, 
  Initcap(concat(users_models.name , ' ', users_models.surname))  as orderer,
  Initcap(concat(um.name, ' ', um.surname )) as supplier,
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

  // Fetch Warehouse Delivery Types
  static fetch_warehouse_delivery_types = `
    select id, type_name from warehouse_delivery_types 
  `

  static updateWarehouseLeftOverAmount(warehouse_id, provide_amount) {
    const string_query = `update warehouse_models set stock = 
    stock - ${provide_amount} where id=${warehouse_id} `;
    return string_query;
  }

}

module.exports = WarehouseQueries;
