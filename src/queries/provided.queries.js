class ProvidedQueries {
  
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
}

module.exports = ProvidedQueries;
