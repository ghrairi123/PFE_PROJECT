const express = require("express");
const fs = require("fs");
const userController = require("../Controllers/userController");
const auth = require("../middleware/auth");
const { verifyAdmin } = require("../Middleware/auth");
const router = express.Router();
const upload = require("../Middleware/UploadSignUp");
const Downloader = require("nodejs-file-downloader");
const Axios = require("axios");
global.__basedir = __dirname;
router.get("/user", userController.getLoggedInUser);
router.get("/AccountOrganizer/:id", userController.getAccountOrganizer);
router.post(
  "/user/:UserId",
  upload.fields([
    {
      name: "CV",
      maxCount: 1,
    },
    {
      name: "Photo",
      maxCount: 1,
    },
  ]),
  userController.updateUserInfo
);
router.get("/account", userController.getLoggedInAccount);
router.get("/organizer", userController.getAllOrganizer);
//router.get("/organiz",userController.getAllOrgani);
router.get("/Invitations", userController.getThreeOrganizers);
router.get("/userInfo/:_id", verifyAdmin, userController.getUserInfo);
router.get("/user/:_id", userController.getUserByid);
router.delete("/user/:AccountId", verifyAdmin, userController.DeleteUser);
router.post(
  "/AcceptOrganizer/:_id",
  verifyAdmin,
  userController.AcceptOrganizer
);

router.post(
  "/DeleteInvitation/:_id",
  verifyAdmin,
  userController.DeleteInvitation
);
router.get("/organizers", verifyAdmin, userController.getAllOrganizers);
router.get("/clients", verifyAdmin, userController.getAllClients);
router.get("/Oneorganizer/:Name", userController.getOneOrganizers);

module.exports = router;
