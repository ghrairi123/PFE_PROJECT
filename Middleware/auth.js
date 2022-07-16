const jwt = require("jsonwebtoken");

const Account = require("../models/account");

const verifyToken = (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res
      .status(401)
      .json({ message: { msgBody: "Not authenticated", msgError: false } });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretkey-MemoireWebApp");
  } catch (err) {
    res.status(500).json({ message: { msgBody: err, msgError: false } });
  }
  if (!decodedToken) {
    res
      .status(401)
      .json({ message: { msgBody: "Not authenticated", msgError: false } });
  }

  return decodedToken.accountId;
};

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.verifyUser = (req, res, next) => {
  const accountId = verifyToken(req, res);
  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      if (account.role !== "client") {
        const error = new Error("Forbidden Access");
        error.statusCode = 403;
        throw error;
      }
      req.loggedInUserId = accountId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.verifyorganizer = (req, res, next) => {
  const accountId = verifyToken(req, res);
  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      if (account.role !== "organisateur") {
        const error = new Error("Forbidden Access");
        error.statusCode = 403;
        throw error;
      }
      req.loggedInUserId = accountId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.verifyAdmin = (req, res, next) => {
  const accountId = verifyToken(req, res);
  Account.findById(accountId)
    .then((account) => {
      if (!account) {
        res
          .status(500)
          .json({
            message: { msgBody: "Internal server error", msgError: false },
          });
      }
      if (account.role !== "admin") {
        res
          .status(403)
          .json({ message: { msgBody: "Forbidden Access", msgError: false } });
      }
      req.loggedInUserId = accountId;
      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
