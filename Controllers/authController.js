const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/account");
const Invitations = require("../models/Invitations");
const sendMail = require("./sendMail");

const { CLIENT_URL } = "http://localhost:3000";

exports.signupOrganizer = (req, res, next) => {
  const {
    Name,
    LastName,
    PhoneNumber,
    email,
    password,
    Adress,
    zipCode,
    City,
    Email_Society,
    Telphn_Society,
    adresse_Society,
    Nom_Society,
    work_station,
    Descriptions,
  } = req.body;
  if (!req.files) {
    req.body.CV = undefined;
    req.body.Photo = undefined;
  } else {
    req.body.CV = req.files.CV ? req.files.CV[0] : undefined;
  }
  const Photo = req.files.Photo;
  const role = "organisateur";
  const Status = 0;
  let token;
  Invitations.findOne({ email: email }).then((invitations) => {
    Account.findOne({ email: email }).then((account) => {
      if (!invitations && !account) {
        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            token = crypto.randomBytes(32).toString("hex");
            if (password.length < 6)
              return res.status(401).json({
                errorMessage: "Le mot de passe comporte au moins 6 caractères.",
              });
            const user = new Invitations({
              Name: Name,
              LastName: LastName,
              role: role,
              email: email,
              password: hashedPassword,
              Status: Status,
              PhoneNumber: PhoneNumber,
              Adress: Adress,
              City: City,
              work_station: work_station,
              adresse_Society: adresse_Society,
              Nom_Society: Nom_Society,
              Email_Society: Email_Society,
              Telphn_Society: Telphn_Society,
              adresse_Society: Telphn_Society,
              Descriptions: Descriptions,
              Photo: Photo,
              CV: req.body.CV,
              zipCode: zipCode,
            });
            return user.save();
          })
          .then((savedAccount) => {
            res
              .status(200)
              .json({ successMessage: "demande envoyée avec succès" });
          })
          .catch((err) => {
            if (!err.statusCode) err.statusCode = 500;
            next(err);
          });
      } else {
        res.status(401).json({ errorMessage: "Vous êtes déjà inscrit" });
      }
    });
  });
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
exports.signupClient = (req, res, next) => {
  const {
    Name,
    LastName,
    PhoneNumber,
    email,
    password,
    Adress,
    zipCode,
    City,
  } = req.body;
  if (
    !Name ||
    !email ||
    !password ||
    !LastName ||
    !PhoneNumber ||
    !Adress ||
    !zipCode ||
    !City
  ) {
    return res
      .status(401)
      .json({ errorMessage: "Merci de remplir tous les champs." });
  }

  if (!validateEmail(email)) {
    return res.status(401).json({ errorMessage: "E-mails invalides." });
  }

  const Photo = req.file;
  const role = "client";
  const Status = 1;
  let token;
  let Usr;
  Invitations.findOne({ email: email }).then((invitations) => {
    Account.findOne({ email: email }).then((account) => {
      if (!invitations && !account) {
        bcrypt.hash(password, 12).then((hashedPassword) => {
          token = crypto.randomBytes(32).toString("hex");
          if (password.length < 6) {
            return res.status(401).json({
              errorMessage: "Le mot de passe comporte au moins 6 caractères.",
            });
          }
          const user = new Invitations({
            Name: Name,
            LastName: LastName,
            role: role,
            email: email,
            password: hashedPassword,
            Status: Status,
            PhoneNumber: PhoneNumber,
            Adress: Adress,
            City: City,
            Photo: Photo,
            zipCode: zipCode,
          });
          user.save();
          console.log(user._id);
          Invitations.findById(user._id).then((data) => {
            Account.findOne({ email: email })
              .then((account) => {
                const accoun = new Account({
                  role: role,
                  email: email,
                  password: hashedPassword,
                  Status: Status,
                  accountVerifyTokenExpiration: Date.now() + 3600000,
                });
                return accoun.save();
              })
              .then((savedAccount) => {
                const user1 = new User({
                  Name: Name,
                  LastName: LastName,
                  PhoneNumber: PhoneNumber,
                  Adress: Adress,
                  City: City,
                  Photo: Photo,
                  zipCode: zipCode,
                  account: savedAccount,
                });
                Invitations.findByIdAndRemove({ _id: user._id })
                  .then((data) => {
                    res.status(200).json({
                      successMessage: "votre compte a été créé avec succès",
                    });
                  })
                  .catch((err) => {
                    res.json(err);
                  });
                return user1.save();
              })
              .catch((err) => {
                if (!err.statusCode) err.statusCode = 500;
                next(err);
              });
          });
        });
      } else {
        return res.status(401).json({ errorMessage: "Vous êtes déjà inscrit" });
      }
    });
  });
};

exports.signupUser = async (req, res, next) => {
  const {
    Name,
    LastName,
    PhoneNumber,
    email,
    password,
    Adress,
    zipCode,
    City,
  } = req.body;
  const Photo = req.file;
  const role = "client";
  const Status = 1;
  let token;
  try {
    await Account.findOne({ email: email }).then((account) => {
      if (!account) {
        token = crypto.randomBytes(32).toString("hex");

        const accoun = new Account({
          role: role,
          email: email,
          password: password,
          Status: Status,
          accountVerifyTokenExpiration: Date.now() + 3600000,
        });
        const accunt = accoun.save();
        res.status(200).json({ accunt });
        /* .then((savedAccount) => {
            const user = new User({
              Name: Name,
              LastName: LastName,
              PhoneNumber: PhoneNumber,
              Adress: Adress,
              City: City,
              zipCode: zipCode,
              account: savedAccount,
            });

            return user
              .save()
              .then((savedUser) => {
                res
                  .status(200)
                  .json({ savedUser, successMessage: "Votre compte est prêt" });
              })
              .catch((err) => {
                res
                  .status(200)
                  .json({ err, successMessage: "Votre compte est prêt" });
                next(err);
              });
          }); */
      } else {
        res.status(401).json({ errorMessage: "Email existe déja" });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  Invitations.findOne({ email: email }).then((account) => {
    if (account) {
      return res.status(401).json({
        errorMessage: "vous n'avez pas encore l'autorisation d'accéder",
      });
    } else {
      Account.findOne({ email: email })
        .then((account) => {
          if (!account) {
            return res.status(401).json({
              errorMessage: "l'utilisateur n'existe pas.",
            });
          }
          loadedUser = account;
          return bcrypt.compare(password, account.password);
        })
        .then((isEqual) => {
          if (!isEqual) {
            return res
              .status(401)
              .json({ errorMessage: "Mot de passe incorrect" });
          }

          const token = jwt.sign(
            { accountId: loadedUser._id.toString() },
            "supersecretkey-MemoireWebApp",
            { expiresIn: "10h" }
          );
          res.status(200).json({
            message: "Connecté avec succès",
            token: token,
            userData: loadedUser,
          });
        })
        .catch((err) => {
          if (!err.statusCode) err.statusCode = 500;
          next(err);
        });
    }
  });
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Account.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Vérifiez votre e-mail" });
    const access_token = jwt.sign(
      { accountId: user._id.toString() },
      "supersecretkey-MemoireWebApp",
      { expiresIn: "15m" }
    );
    const url = `http://localhost:3000/reset/${access_token}`;

    sendMail(email, url, "réinitialiser");
    res.json({
      msg: "Renvoyez le mot de passe, veuillez vérifier votre e-mail.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.emailexist = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Account.findOne({ email });
    if (user) return res.status(200).json({ msg: "Vous êtes déjà inscrit" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);

    await Account.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Mot de passe changé avec succès!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
