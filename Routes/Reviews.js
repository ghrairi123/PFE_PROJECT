const router = require("express").Router();
//const commentCtrl = require('../controllers/Reviews')
const {
  createEventReview,
  getEventReview,
  DeleteReviews,
} = require("../controllers/Reviews");
const upload = require("../Middleware/multervideo");

/* router.get('/comments/:id', commentCtrl.getComments) */
router.post(
  "/comments/:id/:userid/:username",
  upload.single("Photo"),
  createEventReview
);
router.delete("/comments/:idReviews", DeleteReviews);
router.get("/EventReview/:id", getEventReview);
module.exports = router;
