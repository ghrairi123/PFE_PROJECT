const express = require("express");
const {
  postMessage,threeMessages,AllMessages,DeleteMessage
} = require('../Controllers/Contact_Us');
const {verifyAdmin} = require("../Middleware/auth");
const router = express.Router();

router.post(
  "/message", 
  postMessage
);
router.delete(
  "/message/:id", 
  DeleteMessage
);
router.get(
  "/threemessage", 
  threeMessages
);
router.get(
  "/message", 
  AllMessages
);
module.exports = router;
