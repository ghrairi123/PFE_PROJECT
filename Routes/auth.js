const express = require("express");
const bcrypt = require("bcryptjs");
const validate = require("deep-email-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/account");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Invitations = require("../models/Invitations");
const authController = require("../Controllers/authController");
const auth = require("../middleware/Authass");

const router = express.Router();
const emailValidator = require("deep-email-validator");
const upload = require("../Middleware/UploadSignUp");
const sgMail = require("@sendgrid/mail");
const sendMail = require("../Controllers/sendMail");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const { CLIENT_URL } = process.env;
const EMAIL = process.env.FROM_EMAIL;
/* const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "c#$Pv)fkxMr[u/K:)2&N?!%Wr~`<Y)8^u=+B_V,xd;Aw&c=",
    },
  })
); */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    api_key: "c#$Pv)fkxMr[u/K:)2&N?!%Wr~`<Y)8^u=+B_V,xd;Aw&c=",
  },
});

sgMail.setApiKey(process.env.MAIL_KEY);
router.post("/signup-user", upload.single("Photo"), authController.signupUser);
router.post(
  "/signup-Client",
  upload.single("Photo"),
  authController.signupClient
);
router.post("/forgot", authController.forgotPassword);
router.post("/reset", auth, authController.resetPassword);

router.post(
  "/signup-organizer",
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
  authController.signupOrganizer
);

router.post("/login", authController.login);
router.post("/reset-password", (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res
          .status(422)
          .json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "no-replay@insta.com",
          subject: "password reset",
          html: `
                     <p>You requested for password reset</p>
                     <h5>click in this <a href="${email}/reset/${token}">link</a> to reset password</h5>
                     `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
});

module.exports = router;
