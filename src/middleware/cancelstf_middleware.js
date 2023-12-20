

const {UserModel} = require('../../models');

const procurementMiddleware = async (req, res, next) => {

  const data = req.body;

  // Find Current user and check department is Procurement
  const current_user = await UserModel.findByPk(data.user_id);

  if(current_user.dataValues.departmentId === 2 || current_user.dataValues.departmentId === 3 ){
    next();
  }
  else{
    console.log('Error Happen, User dont hav ');
    res.status(400).json({"Authorization Error":"You Dont Have authority for this operation"})
  }

}


module.exports = procurementMiddleware