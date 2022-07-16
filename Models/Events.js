const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
const Event_UserSchema = new mongoose.Schema(
  {
    Price: {
      type: String,
    },
    User: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    Organizer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const EquipeSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
    },
    Photo: [Object],
    Lastname: {
      type: String,
    },
    JobName: {
      type: String,
    },
    Description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ClassEventSchema = new mongoose.Schema(
  {
    ClassName: {
      type: String,
      //required:true
    },
    Price: {
      type: String,
      //required:true
    },
    NumbrePlace: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

/* const SponsorSchema = new mongoose.Schema(
  {
    Logo: [Object],
    Name: {
      type: String,
    },
    Type: {
      type: String,
      enum: ["Platinum", "gold", "silver", "media"],
    },
  },
  {
    timestamps: true,
  }
); */
const EventSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    Location: {
      type: String,
      //  require:true
    },
    city: {
      type: String,
      //  require:true
    },
    Fillingrate: {
      type: Number,
      default: 0,
    },
    StartDate: {
      type: String,
      //  require:true
    },
    StartTime: {
      type: String,
      //  require:true
    },
    EndTime: {
      type: String,
      //  require:true
    },
    images: [Object] /* 
    ProfilPicture:{
      type:String
    }, */,
    vidéo: [Object],
    Reserved_seat: {
      type: Number,
      default: 0,
    },
    Unreserved_seat: {
      type: Number,
    },

    Status: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    Promo: { type: Boolean, default: false },

    Validate: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },

    reviews: [reviewSchema],
    Equipes: [EquipeSchema],
    PaymentDetails: [Event_UserSchema],
    PaymentTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    numEquipes: {
      type: Number,
      required: true,
      default: 0,
    },
    Classes: [ClassEventSchema],
    numClasses: {
      type: Number,
      required: true,
      default: 0,
    },

    /*  Sponsors: [SponsorSchema],
    numSponsors: {
      type: Number,
      required: true,
      default: 0,
    }, */
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    /* 
    numReviews: Number,
    rating: Number, */
    //Addons:{ type: mongoose.Schema.Types.ObjectId, ref: 'AddonOfEvent'},
    //Class:{ type: mongoose.Schema.Types.ObjectId, ref: 'ClassEvent'},

    Category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    Scategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
