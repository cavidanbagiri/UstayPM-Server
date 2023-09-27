const {
  ProjectModel,
  DepartmentModel,
  StatusModel,
  UserModel,
  FieldsModel,
  STFNUMS,
} = require("../../models");

const hashPassword = require("../helpers/hash_password");

class AdminService {
  static async createProject(project_name, code_name) {
    const new_project = await ProjectModel.create({
      project_name: project_name,
      code_name: code_name,
    });

    return new_project;
  }

  static async createDepartment(department_name) {
    const new_department = await DepartmentModel.create({
      department_name: department_name,
    });
    return new_department;
  }

  static async setStatus(data) {
    const new_status = await StatusModel.create({
      status_name: data.status_name,
      status_code: data.status_code,
      departmentId: data.departmentId,
    });
    return new_status;
  }

  static async createUser(data) {
    data.password = await hashPassword(data.password);
    const new_user = await UserModel.create({
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      projectId: data.projectId,
      departmentId: data.departmentId,
      statusId: data.statusId,
    });
    return new_user;
  }

  static async createField(data) {
    const new_field = await FieldsModel.create({
      field_name: data.field_name,
      projectId: data.projectId,
    });

    return new_field;
  }

  static async createDefaultRowSTFNUMS(data) {
    const first = await STFNUMS.findOne();
    if (!first) {
      const default_stf_nums = await STFNUMS.create({
        stf_nums: data.stf_nums,
        projectId: data.projectId,
      });
      return first;
    }
    throw new Error('Default Value Already Has')
  }

  static async fetchProject(projectId){
    const res = await ProjectModel.findOne({
      attributes:["project_name"],
      where:{
        id:projectId
      }
    })
    return res?.dataValues?.project_name
  }

  static async fetchfields(projectId){
    const res = await FieldsModel.findAll({
      attributes:["id", "field_name"],
      where:{
        "projectId":projectId
      }
    })
    console.log(res);
    return res
  }

}

module.exports = AdminService;
