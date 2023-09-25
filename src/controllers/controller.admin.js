
const AdminService = require('../services/service.admin');

class AdminController {

    static async createProject(req, res, next){

        const {project_name, code_name} = req.body;
        console.log(project_name, code_name);
        try{
            await AdminService.createProject(project_name, code_name)
            .then((respond)=>{
                console.log('New Project Creates');
                return res.send(respond);
            })
            .catch((err)=>{
                console.log('Create Project Error : ',err);
                throw new Error(err);
            })
        }
        catch(err){
            console.log('Create Project Error: ',err);
            throw new Error(err);
        }
    }

}


module.exports = AdminController