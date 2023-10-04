const AdminService = require("../services/service.admin");
const tryCatch = require("../utils/trycatch");

class AdminController {
  
  // Create New Project
  static async createProject(req, res, next) {
    const { project_name, code_name } = req.body;
    try {
      await AdminService.createProject(project_name, code_name)
        .then((respond) => {
          return res.status(201).send(respond);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
  // Create New Department
  static async createDepartment(req, res, next) {
    const { department_name } = req.body;

    try {
      await AdminService.createDepartment(department_name)
        .then((respond) => {
          return res.status(201).send(respond);
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err)
    }
  }
  // Set Status || Change Status
  static async setStatus(req, res, next) {
    const data = req.body;
    try {
        await AdminService.setStatus(data)
        .then((respond)=>{
            return res.status(201).send(respond);
        })
        .catch((err)=>{
            next(err);
        })
    } catch (err) {
      next(err)
    }
  }
  // Create User
  static async createUser(req, res, next) {
    const data = req.body;
    try {
        await AdminService.createUser(data)
        .then((respond)=>{
            return res.status(201).send(respond);
        })
        .catch((err)=>{
            next(err);
        })
    } catch (err) {
      next(err)
    }
  }

  // Create Field
  static async createField(req, res, next) {

    const data = req.body;

    tryCatch(
      await AdminService.createField(data)
      .then((respond)=>{
        res.status(201).send(respond)
      })
      .catch((err)=>{
        console.log('Create Field Error : ',err);
        next(err)
      })
    )

  }

  // Create First Row
  static async createDefaultRowSTFNUMS(req, res, next){
    const data = req.body;
    tryCatch(
      await AdminService.createDefaultRowSTFNUMS(data)
      .then((respond)=>{
        res.status(201).send(respond);
      })
      .catch((err)=>{
        console.log('Default Row Created Error : ',err);
        next(err)
      })
    )
  }

  // Fetch Project Name 
  static async fetchProject (req, res, next){
    const project_id = req.params.project_id;
    tryCatch(
      await AdminService.fetchProject(project_id)
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Project Id Row Created Error : ',err);
        next(err)
      })
    )
  }

  // Fetch Fields Name 
  static async fetchfields (req, res, next){
    const project_id = req.params.project_id;
    tryCatch(
      await AdminService.fetchfields(project_id)
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Project Id Row Created Error : ',err);
        next(err)
      })
    )
  }

  // Create Vendor 
  static async createVendor (req, res, next){
    const data = req.body;
    console.log('data is : ',data);
    tryCatch(
      await AdminService.createVendor(data)
      .then((respond)=>{
        res.status(200).send(respond);
      })
      .catch((err)=>{
        console.log('Project Id Row Created Error : ',err);
        next(err)
      })
    )
  }

}

module.exports = AdminController;
