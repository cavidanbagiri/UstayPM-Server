const multer = require("multer");
const fs = require("fs");

const s3 = require("../../storage/storage");

class AddProfileImage {
  // Check folder is exits or not
  static #check = () => {
    if (fs.existsSync("./src/public/profileimages")) {
      console.log("yes work");
      return true;
    } else {
      console.log("no");
      return false;
    }
  };

  static addProfileImage = () => {
    if (this.#check()) {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./src/public/profileimages");
        },
        filename: async function (req, file, cb) {
          //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          const MIME_TYPE_MAP = {
            "image/png": "png",
            "image/jpeg": "jpeg",
            "image/jpg": "jpg",
          };
          // cb(null, file.originalname)
          const ext = MIME_TYPE_MAP[file.mimetype];
          const file_name = req.body.id + "." + ext;

          let upload = await s3.Upload(
            {
              buffer: file
            },
            "/profile_images/"
          );

          cb(null, file_name);
        },
      });

      // Second Add Storage For Multer
      // const upload = multer({ storage: storage });
      // return upload;
    }
    console.log("none find");
    return "null";
  };
}

module.exports = AddProfileImage;
