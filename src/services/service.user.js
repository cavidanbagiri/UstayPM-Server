const UserNotFoundError = require("../exceptions/UserNotFoundError");
const {
  UserModel,
  DepartmentModel,
  ProjectModel,
  StatusModel,
} = require("../../models");

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

class UploadImage {
  static async uploadImageToStorage(user_id, file) {
    console.log('Upload Image Start To Work : ', file)
    const file_buffer = Buffer.alloc(file)
    console.log('buffer is : ', file_buffer);
    let upload = await s3.Upload(
      {
        buffer: file_buffer,
        name: 'lolkek.png',
      },
      '/profile_images/'
    );
    console.log('upload is : ', upload);
  }

  // static async uploadImage(user_id, file){

  //   const MIME_TYPE_MAP = {
  //     "image/png": "png",
  //     "image/jpeg": "jpeg",
  //     "image/jpg": "jpg",
  //   };

  //   const ext = MIME_TYPE_MAP[file.mimetype];
  //   const file_name = '/profileimages/' + user_id + "." + ext;
  //   const user = await UserModel.findByPk(user_id);
  //   await user.update({image_url:file_name})
  //   await user.save();

  //   return file_name;

  // }
}

module.exports = {
  UserService,
  UploadImage,
};
