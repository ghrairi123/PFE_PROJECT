const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategories,
  updateCategories,
  getCategory,
  ShowEventsparCategory,
  ShowAllEventsparCategory,
  getEvntCat,
  subparCategory,
} = require("../Controllers/Category");
const { verifyAdmin } = require("../Middleware/auth");

const upload = require("../Middleware/multer");
//Pour creer des gestionnaires de routeur
const router = express.Router();
router.post("/category", verifyAdmin, upload.single("fileName"), addCategory);
router.get("/category", getCategories);
router.get("/Evnt", getEvntCat);
router.get("/category/:categoryId", getCategory);
router.get("/categoryEvent/:id", ShowEventsparCategory);
router.get("/subparCategory/:id", subparCategory);
router.get("/AllEventsCategory/:id", ShowAllEventsparCategory);
router.put(
  "/category/:id",
  /*  verifyAdmin, */
  upload.single("fileName"),
  updateCategories
);
router.delete("/category/:itemId", verifyAdmin, deleteCategories);

module.exports = router;
