

const {UserModel} = require('../../models');

const warehouseMiddleware = async (req, res, next) => {

  const body = req.body;

  

  let current_user = '';

  if(typeof body.user === 'object'){
    current_user = await UserModel.findByPk(body.user.id);
  }
  else if(typeof body.user === 'number'){
    current_user = await UserModel.findByPk(body.user);
  }
  

  if(current_user.departmentId === 3){
    console.log('yes warehouse');
    next();
  }
  else{
    res.status(400).json({"Authorization Error":"You Dont Have authority for this operation"});
    // throw new Error("You dont have authority for this operation");
  }

}

module.exports = warehouseMiddleware;