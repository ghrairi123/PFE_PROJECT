const express = require("express");
const {verifyAdmin} = require("../Middleware/auth");

const upload = require("../Middleware/multer");
const router = express.Router();
const {
    create,
    readAll,
    read,
    update,
    Show,
    ShowCatego,
    deleted
  } = require("../Controllers/Sub-category");

  router.post(
    '/SubCategory',
    verifyAdmin,
    upload.single('fileName'),
    create

  );
  
router.get('/SubCategory', readAll);
router.get('/SubCategory/Show', Show);
router.get('/SubCategory/ShowCatego', ShowCatego);


router.get('/SubCategory/:ScategoryId',read);


router.put(
	'/SubCategory/:ScategoryId',
	verifyAdmin,
	upload.single('fileName'),
update
);
router.delete('/SubCategory/:ScategoryId', verifyAdmin,deleted);
module.exports = router;