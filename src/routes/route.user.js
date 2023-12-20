const express = require("express");
const router = express.Router();
// const fs = require("fs");
// const multer = require("multer");

const UserController = require("../controllers/controller.user");
const AddProfileImage = require("../middleware/add_profile_image");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./src/public/profileimages");
//   },
//   filename: function (req, file, cb) {
//     //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     const MIME_TYPE_MAP = {
//       "image/png": "png",
//       "image/jpeg": "jpeg",
//       "image/jpg": "jpg",
//     };
//     // cb(null, file.originalname)
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     const file_name = req.body.id + '.' + ext;
//     cb(null, file_name);
//   },
// });

// const check = () => {
//   if (fs.existsSync("./src/public/profileimages")) {
//     console.log("yes work");
//     return true;
//   } else {
//     console.log("no");
//     return false;
//   }
// };

// check();

// // Second Add Storage For Multer
// const upload = multer({ storage: storage });

router.post("/login", UserController.loginUser);

// router.post("/upload", upload.single("file"), (req, res) => {
//   console.log(req.body);
//   console.log(req.file);
//});

router.post("/upload", AddProfileImage.addProfileImage().single("file"), UserController.uploadImage);


module.exports = router;
