const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Account = require("../models/account");
const Invitations = require("../models/Invitations");
const fs = require("fs");
exports.getLoggedInUser = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretkey-MemoireWebApp");
  } catch (err) {
    return res.status(500).send({ auth: false, message: err });
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    return res.status(401).send({ auth: false, message: error });
  }

  const accountId = decodedToken.accountId;
  let accountObj;

  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      accountObj = account;
      return User.findOne({ account: account._id }).populate({
        path: "account",
        select: ["email", "role", "password"],
      });
    })
    .then((user) => {
      if (user) {
        return user;
      }
    })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
exports.getLoggedInAccount = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretkey-MemoireWebApp");
  } catch (err) {
    return res.status(500).send({ auth: false, message: err });
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    return res.status(401).send({ auth: false, message: error });
  }

  const accountId = decodedToken.accountId;
  let accountObj;

  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      return res.json(account);
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getAllOrganizer = async (req, res) => {
  var promise = Invitations.find().sort({ createdAt: -1 }).exec();
  promise
    .then(function (docs) {
      if (!docs) {
        throw new Error("Invitation profile not found"); //reject promise with error
      }
      return res.status(200).json(docs); //return user profile
    })
    .catch(function (err) {
      console.log(err); //User profile not found
      return res.status(404).json(err.message); //return your error msg
    });
};
exports.getAccountOrganizer = async (req, res) => {
  Account.findById(req.params.id).exec((error, account) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (account) {
      res.status(200).json({ account });
    }
  });
};

exports.updateUserInfo = async (req, res) => {
  const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it

  if (!req.files) {
    updateData.CV = undefined;
    updateData.Photo = undefined;
  } else {
    updateData.CV = req.files.CV ? req.files.CV[0] : undefined;
  }
  updateData.Photo = req.files.Photo;
  User.findByIdAndUpdate(
    req.params.UserId,
    {
      $set: updateData,
    },
    (error, category) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json({
          successMessage: `User Information mise à jour avec succès!`,
          category,
        });
      }
    }
  );
};
exports.getAllOrganizers = async (req, res) => {
  const data = [];
  const account = await Account.find({ role: "organisateur" });
  const user = await User.find();
  user.forEach((Element) => {
    account.forEach((item) => {
      if (item._id.toString() == Element.account.toString()) {
        const data1 = {
          accountname: item.email,
          role: item.role,
          username: Element.Name,
          LastName: Element.LastName,
          PhoneNumber: Element.PhoneNumber,
          Photo: Element.Photo,
          work_station: Element.work_station,
          Adress: Element.Adress,
          zipCode: Element.zipCode,
          Descriptions: Element.Descriptions,
          City: Element.City,
          CV: Element.CV,
          Nom_Society: Element.Nom_Society,
          Email_Society: Element.Email_Society,
          Telphn_Society: Element.Telphn_Society,
          adresse_Society: Element.adresse_Society,
          Account_id: item._id,
          _id: Element._id,
        };
        data.push(data1);
      }
    });
  });
  res.status(200).json({ data: data });
};

exports.getAllClients = async (req, res) => {
  const data = [];
  const account = await Account.find({ role: "client" });
  const user = await User.find();
  user.forEach((Element) => {
    account.forEach((item) => {
      if (item._id.toString() == Element.account.toString()) {
        const data1 = {
          accountname: item.email,
          role: item.role,
          username: Element.Name,
          LastName: Element.LastName,
          PhoneNumber: Element.PhoneNumber,
          Photo: Element.Photo,
          work_station: Element.work_station,
          Adress: Element.Adress,
          zipCode: Element.zipCode,
          Descriptions: Element.Descriptions,
          City: Element.City,
          CV: Element.CV,
          Nom_Society: Element.Nom_Society,
          Email_Society: Element.Email_Society,
          Telphn_Society: Element.Telphn_Society,
          adresse_Society: Element.adresse_Society,
          Account_id: item._id,
          _id: Element._id,
        };
        data.push(data1);
      }
    });
  });
  res.status(200).json({ data: data });
};
exports.DeleteUser = async (req, res) => {
  const AccountId = req.params.AccountId;
  const account = await Account.findById(AccountId);
  const user = await User.find();
  try {
    user.forEach((Element) => {
      if (account._id.toString() == Element.account.toString()) {
        Account.findByIdAndRemove(AccountId, (err, docs) => {
          if (!err)
            User.findByIdAndRemove(Element._id, (err, user) => {
              if (!err) res.status(200).json(user);
            });
          else
            console.log(
              "Error while deleting a record : " +
                JSON.stringify(err, undefined, 2)
            );
        });
      }
    });
  } catch (err) {
    console.log(err, "UserController.delete error");
    res.status(500).json({
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.AcceptOrganizer = (req, res, next) => {
  const id_user = req.params._id;
  console.log(req.body);
  Invitations.findById({ _id: id_user }).then((data) => {
    const Name = data.Name;
    const LastName = data.LastName;
    const PhoneNumber = data.PhoneNumber;
    const email = data.email;
    const password = data.password;
    const Adress = data.Adress;
    const zipCode = data.zipCode;
    const City = data.City;
    const Email_Society = data.Email_Society;
    const Telphn_Society = data.Telphn_Society;
    const adresse_Society = data.adresse_Society;
    const Nom_Society = data.Nom_Society;
    const work_station = data.work_station;
    const Descriptions = data.Descriptions;
    const Photo = data.Photo;
    const CV = data.CV;
    const role = data.role;
    const Status = 1;
    Account.findOne({ email: email })
      .then((account) => {
        const accoun = new Account({
          role: role,
          email: email,
          password: password,
          Status: Status,
          accountVerifyTokenExpiration: Date.now() + 3600000,
        });
        return accoun.save();
      })
      .then((savedAccount) => {
        const user = new User({
          Name: Name,
          LastName: LastName,
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
          CV: CV,
          zipCode: zipCode,
          account: savedAccount,
        });
        Invitations.findByIdAndRemove({ _id: id_user })
          .then((data) => {
            res.status(200).json(" Organisateur Accepté");
          })
          .catch((err) => {
            res.json(err);
          });
        return user.save();
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  });
};
exports.DeleteInvitation = (req, res) => {
  const id_user = req.params._id;
  console.log(req.body);
  const deletedInvitations = Invitations.findByIdAndRemove({ _id: id_user })
    .then((data) => {
      res.status(200).json(deletedInvitations);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Veuillez réessayer plus tard",
      });
    });
};
(exports.getThreeOrganizers = (req, res) => {
  Invitations.find((err, docs) => {
    if (!err) res.status(200).json(docs);
    else
      console.log(
        "Erreur lors de la récupération de tous les enregistrements : " +
          JSON.stringify(err, undefined, 2)
      );
  })
    .sort({ _id: -1 })
    .limit(3);
}),
  (exports.getUserInfo = (req, res) => {
    const id_user = req.params._id;

    console.log(req.body);
    Invitations.findById({ _id: id_user })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.json(err);
      });
    //const center = await Center.findById({ _id : req.params.id}).populate('books');
    //res.send(account);
  });

exports.getUserByid = (req, res) => {
  const id_user = req.params._id;

  console.log(req.body);
  User.findById({ _id: id_user })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
  //const center = await Center.findById({ _id : req.params.id}).populate('books');
  //res.send(account);
};
exports.getOneOrganizers = async (req, res) => {
  const data = [];
  const account = await Account.find();
  const user = await User.find({ Name: req.params.Name });
  user.forEach((Element) => {
    account.forEach((item) => {
      if (item._id.toString() == Element.account.toString()) {
        const data1 = {
          accountname: item.email,
          role: item.role,
          username: Element.Name,
          LastName: Element.LastName,
          PhoneNumber: Element.PhoneNumber,
          Photo: Element.Photo,
          work_station: Element.work_station,
          Adress: Element.Adress,
          zipCode: Element.zipCode,
          Descriptions: Element.Descriptions,
          City: Element.City,
          CV: Element.CV,
          Nom_Society: Element.Nom_Society,
          Email_Society: Element.Email_Society,
          Telphn_Society: Element.Telphn_Society,
          adresse_Society: Element.adresse_Society,
          Account_id: item._id,
          _id: Element._id,
        };
        data.push(data1);
      }
    });
  });
  res.status(200).json({ data: data });
};
