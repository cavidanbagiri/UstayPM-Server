
const UserNotFoundError = require('../exceptions/UserNotFoundError');
const { UserModel } = require('../../models');

class UserService {

  static async loginUser(user_data) {
    return await UserModel.findOne({
      where: {
        email: user_data.email,
        password: user_data.password,
      },
    })
    .then((respond)=>{
      return respond.dataValues
    }).catch((err)=>{
      throw new UserNotFoundError("User Not Found", 400)
    })
  }
}

module.exports = UserService;
