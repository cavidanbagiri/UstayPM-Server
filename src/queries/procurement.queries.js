
class ProcurementQueries{

  static select_all_stf_query = `

  select stf_models.stf_num, stf_models.completed, stf_models.material_type, stf_models.material_name, stf_models.material_unit, stf_models."createdAt",
  concat(users_models.name , ' ', users_models.surname)  as username
  from stf_models
  left join users_models on users_models.id = stf_models."userId"

  `

}

module.exports = ProcurementQueries