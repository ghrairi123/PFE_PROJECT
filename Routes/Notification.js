const express = require("express");
const {
  getNotifications,
  deleteNotifications,
  getAllNotifications,
} = require("../Controllers/Notification");
const router = express.Router();
router.get("/Notifications/:id", getNotifications);
router.get("/AllNotifications/:id", getAllNotifications);
router.post("/Notifications/:id", deleteNotifications);
module.exports = router;
