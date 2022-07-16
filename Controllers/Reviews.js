const mongoose = require("mongoose");
const Events = require("../Models/Events");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  sorting() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.createEventReview = async (req, res) => {
  const { rating, comment } = req.body;
  const Photo = req.file;

  const event = await Events.findById(req.params.id);

  if (event) {
    const alreadyReviewed = event.reviews.find(
      (r) => r.user.toString() === req.params.userid.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ errorMessage: "vous avez déjà noté cet événement" });
    }
    const review = {
      name: req.params.username,
      rating: Number(rating),
      comment: comment,
      user: req.params.userid,
      Photo: Photo,
    };
    event.reviews.push(review);
    event.numReviews = event.reviews.length;
    event.rating =
      event.reviews.reduce((acc, item) => item.rating + acc, 0) /
      event.reviews.length;
    await event.save();
    res.status(201).json({ message: "Avis ajouté" });
  } else {
    res.status(400).json({ errorMessage: "événement introuvable" });
  }
};
exports.updateReview = async (req, res) => {
  const updateData = Object.assign({}, req.body);
  updateData.Photo = req.file; // Copy req.body in order not to change it
  try {
    await Events.update(
      { "reviews._id": mongoose.Types.ObjectId(req.params.idReviews) },
      {
        $set: {
          "reviews.$.name": updateData.name,
          "reviews.$.comment": updateData.comment,
        },
      }
    );
    res.json({ successMessage: "Review Modifiée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.DeleteReviews = async (req, res) => {
  try {
    await Events.update(
      { "reviews._id": mongoose.Types.ObjectId(req.params.idReviews) },

      {
        $pull: {
          reviews: {
            _id: mongoose.Types.ObjectId(req.params.idReviews),
          },
        },
      },
      { multi: true }
    );
    res.status(200).json({ successMessage: "Reviews Supprimé" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.getEventReview = async (req, res) => {
  const event = await Events.find({
    "PaymentDetails.User": req.params.id,
  });
  res.status(200).json({ event });
};
