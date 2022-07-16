const Contact_Us = require("../Models/Contact_Us.js");
const mongoose = require("mongoose");
let users = mongoose.model("user");
let Account = mongoose.model("Account");
const fs = require("fs");

exports.postMessage = (req, res) => {
  var newRecord = new Contact_Us({
    Username: req.body.Username,
    email_User: req.body.email_User,
    Subject: req.body.Subject,
    Messg: req.body.Messg,
  });

  newRecord.save((err, docs) => {
    if (!err) {
      res
        .status(201)
        .json({ successMessage: "message envoyé avec succès", docs });
    } else {
      res.status(500).json({
        errorMessage: { msgBody: "Error has occured", msgError: true },
      });
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
    }
  });
};

exports.threeMessages = async (req, res) => {
  await Contact_Us.find()
    .sort({ createdAt: -1 })
    .limit(3)
    .exec((error, messag) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (messag) {
        res.status(200).json({ messag });
      }
    });
};

exports.AllMessages = async (req, res) => {
  await Contact_Us.find()
    .exec((error, messag) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (messag) {
        res.status(200).json({ messag });
      }
    })
    .sort({ createdAt: -1 });
};

exports.DeleteMessage = async (req, res) => {
  try {
    await Contact_Us.findByIdAndDelete(req.params.id).exec((error, messag) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (messag) {
        res.status(200).json({ messag });
      }
    });

    //	res.json({successMessage:"Message Suprimée"})
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
