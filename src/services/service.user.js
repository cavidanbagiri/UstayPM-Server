const UserNotFoundError = require("../exceptions/UserNotFoundError");
const {
  UserModel,
  DepartmentModel,
  ProjectModel,
  StatusModel,
  sequelize,
} = require("../../models");
const UserQueries = require('../queries/user_queries');
const s3 = require('../../storage/storage');

class UserService {
  static async loginUser(user_data) {
    return await UserModel.findOne({
      include: [
        {
          model: DepartmentModel,
          attributes: ["department_name"],
        },
        {
          model: ProjectModel,
          attributes: ["project_name"],
        },
        {
          model: StatusModel,
          attributes: ["status_name"],
        },
      ],
      where: {
        email: user_data.email,
        password: user_data.password,
      },
      required: false,
    })
      .then((respond) => {
        return respond.dataValues;
      })
      .catch((err) => {
        throw new UserNotFoundError("User Not Found : " + err, 400);
      });
  }
}

class FetchAllUsers {

  static async fetahAllUsers(project_id, user_id){  

    const res = await sequelize.query(UserQueries.fetchAllUsers(project_id, user_id));
    return res[0];

  }

}

class UploadImage {

  static async uploadImageToStorage(user_id, file) {
    let upload = await s3.Upload(
      {
        buffer: file.buffer,
      },
      '/profile_images/'
    );
    // console.log('upload is : ', upload);
    const user = await UserModel.findByPk(user_id);
    await user.update({image_url:upload.Location})
    return upload.Location;
  }


  // static async uploadImage(user_id, file){

  //   const MIME_TYPE_MAP = {
  //     "image/png": "png",
  //     "image/jpeg": "jpeg",
  //     "image/jpg": "jpg",
  //   };

  //   const ext = MIME_TYPE_MAP[file.mimetype];
  //   const file_name = '/profileimages/' + user_id + "." + ext;
    // const user = await UserModel.findByPk(user_id);
    // await user.update({image_url:file_name})
  //   await user.save();

  //   return file_name;

  // }


}

module.exports = {
  UserService,
  UploadImage,
  FetchAllUsers
};
