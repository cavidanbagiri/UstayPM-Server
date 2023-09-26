
const { UserModel } = require('../../models');

class UserService {

  static async loginUser(user_data) {
    const user = await UserModel.findOne({
      where: {
        email: user_data.email,
        password: user_data.password,
      },
    });
    if (user) {
      return user.dataValues;
    } else {
      console.log('User Login Error : ',err);
      return null;
    }
  }
}

module.exports = UserService;
