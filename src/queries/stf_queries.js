class STFQUeries {
  // Filter Queries for User STF
  static stf_user_filter_query = `
    select stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_unit, stf_models."createdAt"
    from stf_models
    left join users_models on users_models.id = stf_models."userId"
  `;

  // Create new stf num and add to stfmodel
  static createSTFNUMSAndReturn(projectId) {
    const create_stf_nums_and_return = `
    INSERT INTO stf_nums(stf_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select stf_nums from stf_nums order by id DESC limit 1),${projectId}, current_timestamp, current_timestamp ) returning stf_nums
  `;
    return create_stf_nums_and_return;
  }

  // Fetch ALl STF For User
  static fetchUserSTFAll(user_id) {
    const string_query = `
    select stf_models.id as stf_id, stf_num, material_type, material_name, material_amount, material_unit, stf_models."createdAt", completed,
    concat(users_models.name, ' ', users_models.surname) as username, fields_models.field_name from stf_models
    left join users_models on stf_models."userId" = users_models.id
    left join fields_models on fields_models.id = "fieldId"
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
    warehouse_models.stock, warehouse_models.certificate, warehouse_models.passport, fields_models.field_name as field, vendors_models.vendor_name
    from warehouse_models
    LEFT JOIN sm_models ON warehouse_models."smId" = sm_models.id
    LEFT JOIN stf_models ON sm_models."stfId" = stf_models.id
    LEFT JOIN vendors_models ON sm_models."vendorId" = vendors_models.id
    LEFT JOIN fields_models ON stf_models."fieldId" = fields_models.id
    where stf_models."userId" = ${user_id}
    `;
    return string_query;
  }
}

module.exports = STFQUeries;
