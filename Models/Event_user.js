const mongoose = require("mongoose");

const Event_UserSchema = new mongoose.Schema(
  {
    Price: {
      type: String,
    },
    PlaceNumber: {
      type: String,
    },
    Events: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    Organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Event_user", Event_UserSchema);
