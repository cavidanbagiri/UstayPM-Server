class STFQUeries {
  static createSTFNUMSAndReturn(projectId) {
    const create_stf_nums_and_return = `
    INSERT INTO stf_nums(stf_nums, "projectId", "createdAt", "updatedAt") VALUES (1 + (select stf_nums from stf_nums order by id DESC limit 1),${projectId}, current_timestamp, current_timestamp ) returning stf_nums
  `;
  return create_stf_nums_and_return;
  }
  static fetchUserSTFAll(user_id){
    const string_query = `
    select stf_models.id as stf_id, stf_num, material_type, material_name, material_amount, material_unit, stf_models."createdAt", completed, concat(users_models.name, ' ', users_models.surname) as username, fields_models.field_name from stf_models
    left join users_models on stf_models."userId" = users_models.id
    left join fields_models on fields_models.id = "fieldId"
    where stf_models."userId"=${user_id}
    `
    return string_query;
  } 
}

module.exports = STFQUeries;
