const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    email_User: {
      type: String,
      required: true, min: 6, max: 15 
    },
    Username: {
      type: String,
      required: true,
    },
    Subject: {
      type: String
     
    },
     Messg: {
      type: String
     
    }    

  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
