class STFQUeries {
  

  // Create new stf num and add to stfmodel
  static createSTFNUMSAndReturn(projectId) {
    const create_stf_nums_and_return = `
    INSERT INTO stf_nums(stf_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select stf_nums from stf_nums order by id DESC limit 1),${projectId}, current_timestamp, current_timestamp ) returning stf_nums
  `;
    return create_stf_nums_and_return;
  }

  // Delete stf_num from stf_nums table
  static deleteSTFNumFromSTFNums(projectId, stf_num){
    const string_query = `delete from stf_nums where stf_nums = ${stf_num} and "projectId" = ${projectId} `;
    return string_query;
  }
  // Delete stf_num from stf_nums table
  static deleteSTFNumFromSTFRows(projectId, stf_num){
    const string_query = `delete from stf_models where stf_num = '${stf_num}' and "projectId" = ${projectId} `;
    return string_query;
  }

  // Fetch ALl STF For User
  static fetchUserSTFAll(user_id) {
    const string_query = `
    select stf_models.id as stf_id, stf_num, material_type, material_name, material_amount as amount, material_unit as unit, stf_models."createdAt", completed,
    Initcap(concat(users_models.name, ' ', users_models.surname) ) as username, 
    canceledstf_models."stfId" as canceled_id,
    fields_models.field_name from stf_models
    left join users_models on stf_models."userId" = users_models.id
    left join fields_models on fields_models.id = "fieldId"
    left join canceledstf_models on stf_models.id = canceledstf_models."stfId" 
    where stf_models."userId"=${user_id}
    `;
    return string_query;
  }

  // fetch user warehouse Data
  static fetchUserWarehouseData(user_id) {
    const string_query = `
    select warehouse_models.id as warehouse_id, stf_models.id as stf_id, sm_models.id as sm_id,
    sm_models.sm_num, stf_models.stf_num,
    warehouse_models.delivery_material_name as material_name, warehouse_models.delivery_material_amount as amount, warehouse_models.delivery_material_unit as unit, 
    warehouse_models.stock, warehouse_models.certificate, warehouse_models.passport, fields_models.field_name as field, warehouse_models."createdAt", 
    vendors_models.vendor_name
    from warehouse_models
    LEFT JOIN sm_models ON warehouse_models."smId" = sm_models.id
    LEFT JOIN stf_models ON sm_models."stfId" = stf_models.id
    LEFT JOIN vendors_models ON sm_models."vendorId" = vendors_models.id
    LEFT JOIN fields_models ON stf_models."fieldId" = fields_models.id
    where stf_models."userId" = ${user_id}
    `;
    return string_query;
  }

  // fetch user warehouse Data
  static fetchUserProvidedData(departmentId) {
    const string_query = `
    select sm_models.sm_num, sm_models.sm_material_name as material_name, provided_models.provided_amount as amount, sm_models.sm_material_unit as unit, 
    provided_models.provided_date, provided_models.serial_no, provided_models.unique_id, provided_models.deliver_to, provided_models.card_number
    from provided_models
    left join warehouse_models on provided_models."warehouseId" = warehouse_models.id
    left join sm_models on warehouse_models."smId" = sm_models.id
    where provided_models."departmentId" = ${departmentId}
    `;
    return string_query;
  }

}

module.exports = STFQUeries;


// select sm_models.sm_num, sm_models.sm_material_name as material_name, provided_models.provided_amount as amount, sm_models.sm_material_unit as unit, 
//     provided_models.provided_date, provided_models.serial_no, provided_models.unique_id, provided_models.deliver_to, provided_models.card_number
//     from provided_models
//     left join warehouse_models on provided_models."warehouseId" = warehouse_models.id
//     left join sm_models on warehouse_models."smId" = sm_models.id
//     where provided_models."departmentId" = ${departmentId}