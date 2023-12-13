

const {UserModel} = require('../../models');

const procurementMiddleware = async (req, res, next) => {

  const data = req.body;

  // Find Current user and check department is Procurement
  const current_user = await UserModel.findByPk(data[0].createdBy);

  if(current_user.dataValues.departmentId === 2){
    next();
  }
  else{
    res.status(400).json({"Authorization Error":"You Dont Have authority for this operation"})
  }

}


module.exports = procurementMiddleware