const {
  ProjectModel,
  DepartmentModel,
  StatusModel,
  UserModel,
  FieldsModel,
  STFNUMS,
} = require("../../models");
const EmptyFieldError = require("../exceptions/EmptyFieldError");

const hashPassword = require("../helpers/hash_password");

class AdminService {
  static async createProject(project_name, code_name) {
    return await ProjectModel.create({
      project_name: project_name,
      code_name: code_name,
    })
      .then((respond) => {
        return respond;
      })
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  static async createDepartment(department_name) {
    return await DepartmentModel.create({
      department_name: department_name,
    })
      .then((respond) => {
        return respond;
      })
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  static async setStatus(data) {
    return await StatusModel.create({
      status_name: data.status_name,
      status_code: data.status_code,
      departmentId: data.departmentId,
    })
      .then((respond) => {
        return respond;
      })
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  static async createUser(data) {
    data.password = await hashPassword(data.password);
    return await UserModel.create({
      email: data.email,
      password: data.password,
      name: data.name,
      surname: data.surname,
      projectId: data.projectId,
      departmentId: data.departmentId,
      statusId: data.statusId,
    })
      .then((respond) => {
        return respond;
      })
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  static async createField(data) {
    return await FieldsModel.create({
      field_name: data.field_name,
      projectId: data.projectId,
    })
      .then((respond) => {
        return respond;
      })
      .catch((err) => {
        throw new EmptyFieldError(err.message, 400);
      });
  }

  static async createDefaultRowSTFNUMS(data) {
    const first = await STFNUMS.findOne();
    if (!first) {
      return await STFNUMS.create({
        stf_nums: data.stf_nums,
        projectId: data.projectId,
      })
      .then((respond)=>{
        return respond;
      })
      .catch((err)=>{
        throw new EmptyFieldError(err.message, 400);
      })
    }
    throw new Error("Default Value Already Has");
  }

  static async fetchProject(projectId) {
    const res = await ProjectModel.findOne({
      attributes: ["project_name"],
      where: {
        id: projectId,
      },
    });
    return res?.dataValues?.project_name;
  }

  static async fetchfields(projectId) {
    const res = await FieldsModel.findAll({
      attributes: ["id", "field_name"],
      where: {
        projectId: projectId,
      },
    });
    return res;
  }
}

module.exports = AdminService;
