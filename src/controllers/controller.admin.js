
const AdminService = require('../services/service.admin');

class AdminController {

    static async createProject(req, res, next){

        const {project_name, code_name} = req.body;
        console.log(project_name, code_name);
        try{
            await AdminService.createProject(project_name, code_name)
            .then((respond)=>{
                return res.send(respond);
            })
            .catch((err)=>{
                throw new Error(err);
            })
        } 
        catch(err){
            throw new Error(err);
        }
    }

    static async createDepartment(req, res, next){
        const {department_name} = req.body;
        
        try{
            await AdminService.createDepartment(department_name)
            .then((respond)=>{
                console.log('new Department name is created : ', respond);
                return res.send(respond);
            })
            .catch((err)=>{
                console.log('Error Happen For Create Department: ', err);
                throw new Error(err);
            })
        }
        catch(err){
            console.log('Error Happen For Create Department: ', err);
            throw new Error(err);
        }

    }

}


module.exports = AdminController