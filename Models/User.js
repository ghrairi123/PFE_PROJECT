const mongoose = require("mongoose");

const SocietyInfo = {
  Email_Society: String,
  Telphn_Society: Number,
  adresse_Society: String,
};
const UserSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true },
    Adress: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    PhoneNumber: { type: Number, required: true, length: 8, trim: true },
    // Photo:{type: 'String'},
    Photo: [Object],
    Society: SocietyInfo,
    Nom_Society: String,
    Email_Society: String,
    Telphn_Society: Number,
    adresse_Society: String,
    zipCode: { type: String },
    Descriptions: { type: String },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
    },
    City: { type: String },
    CV: [Object],
    resetPasswordToken: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);
UserSchema.virtual("fullName").get(function () {
  return `${this.Name} ${this.LastName}`;
});

module.exports = mongoose.model("user", UserSchema);
