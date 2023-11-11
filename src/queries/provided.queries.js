class ProvidedQueries {
  
  // Fetc Provided Data
  static fetch_provide_data = `
    select sm_models.sm_num, sm_models.sm_material_name as material_name, provided_models.provided_amount as amount, sm_models.sm_material_unit as unit, 
    provided_models.provided_date, provided_models.serial_no, provided_models.unique_id, provided_models.deliver_to, provided_models.card_number
    from provided_models
    left join warehouse_models on provided_models."warehouseId" = warehouse_models.id
    left join sm_models on warehouse_models."smId" = sm_models.id
  `;
}

module.exports = ProvidedQueries;
