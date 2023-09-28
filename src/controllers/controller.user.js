
const UserService = require('../services/service.user');

const tryCatch = require('../utils/trycatch');
const hashPassowrd = require('../helpers/hash_password');

const {generateToken, refreshToken} = require('../helpers/tokens');

class UserController {

  // User Login
  static async loginUser(req, res, next) {

    const user_data = req.body;
    const hashpassword = await hashPassowrd(user_data.password);
    user_data.password = hashpassword;
    tryCatch(
        await UserService.loginUser(user_data)
        .then((user) => {
          delete user.password;
          const temp_user = {
            ...user,
            tokens:{
              access_token : generateToken(user),
              refresh_token : refreshToken(user)
            }
          }
          res.cookie('jwt',temp_user.tokens.access_token);
          delete user.tokens;
          return res.status(200).send(temp_user);
        })
        .catch((err) => {
          next(err);
        })
    );

  }

}

module.exports = UserController