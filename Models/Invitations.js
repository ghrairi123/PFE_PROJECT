const mongoose = require("mongoose");

const InvitationSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true },
    LastName: { type: String, required: true, trim: true },
    PhoneNumber: { type: Number, required: true, length: 8, trim: true },
    Photo: [Object],
    Nom_Society: String,
    Email_Society: String,
    Telphn_Society: Number,
    adresse_Society: String,
    work_station: { type: String },
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
    Adress: { type: String },
    zipCode: { type: String },
    Descriptions: { type: String },
    City: { type: String },
    CV: [Object],
  },
  {
    timestamps: true,
  }
);
InvitationSchema.virtual("fullName").get(function () {
  return `${this.Name} ${this.LastName}`;
});

module.exports = mongoose.model("Invitations", InvitationSchema);
