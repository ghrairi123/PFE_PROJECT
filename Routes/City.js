const express = require("express");
const {
  getcity,postcity,putcity,deletecity
} = require('../Controllers/CityCtr');
const {verifyAdmin} = require("../Middleware/auth");
const router = express.Router();

router.post(
  "/city",verifyAdmin, 
  postcity
);
router.get("/city", getcity);
router.put(
  "/city/:id",verifyAdmin,
  putcity
);
router.delete(
  "/city/:id",verifyAdmin,
  deletecity
);

module.exports = router;
