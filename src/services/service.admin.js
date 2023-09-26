
const { ProjectModel, DepartmentModel, StatusModel, UserModel } = require('../../models');

const hashPassword = require('../helpers/hash_password');

class AdminService{

    static async createProject(project_name, code_name){
        const new_project = await ProjectModel.create({
            project_name: project_name,
            code_name: code_name,
        })

        return new_project;
    }

    static async createDepartment(department_name){
        const new_department = await DepartmentModel.create({
            department_name: department_name
        })
        return new_department;
    }

    static async setStatus(data){
        const new_status = await StatusModel.create({
            status_name: data.status_name,
            status_code: data.status_code,
            departmentId: data.departmentId
        })
        return new_status
    }
    static async createUser(data){
        data.password = await hashPassword(data.password);
        const new_user = await UserModel.create({
            email: data.email,
            password: data.password,
            name: data.name,
            surname: data.surname,
            projectId: data.projectId,
            departmentId: data.departmentId,
            statusId: data.statusId 
        })
        return new_user
    }
}

module.exports = AdminService