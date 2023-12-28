const express = require("express");
const router = express.Router();
const multer = require("multer");


const UserController = require("../controllers/controller.user");


router.post("/login", UserController.loginUser);

const upload = multer({
    storage: multer.memoryStorage(),
    // limits: {
    //     fileSize: 5 * 1024 * 1024
    // }
})

router.post("/upload", upload.single("file"), UserController.uploadImage);


module.exports = router;
