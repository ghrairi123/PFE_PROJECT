const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const accountSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      min: 6,
      max: 15,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "organisateur", "admin"],
    },
    Status: { type: Number, enum: [0, 1] },
    isVerified: {
      type: Boolean,
      default: false,
    },

    resetToken: String,
    expireToken: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
