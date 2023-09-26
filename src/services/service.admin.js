
const { ProjectModel, DepartmentModel } = require('../../models');

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

}

module.exports = AdminService