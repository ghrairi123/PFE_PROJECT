const mongoose = require("mongoose");

const NotificationsSchema = new mongoose.Schema(
  {
    OrganizerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    type: {
      type: Boolean,
    },
    Event_Name: { type: String },
    Event_Location: { type: String },
    Event_Fellingrate: { type: String },
    Event_City: { type: String },
    Event_StartDate: { type: String },
    Event_Id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notifications", NotificationsSchema);
