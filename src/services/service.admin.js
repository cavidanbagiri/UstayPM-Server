
const {ProjectModel} = require('../../models');

class AdminService{

    static async createProject(project_name, code_name){

        const new_project = await ProjectModel.create({
            project_name: project_name,
            code_name: code_name
        })

        return new_project;
    }

}

module.exports = AdminService