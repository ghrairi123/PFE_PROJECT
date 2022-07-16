const express = require("express");
const {
  AllEvent_user,
  CreateEvent_user,
  Payment,
  QrCode,
} = require("../Controllers/Event_user");
const router = express.Router();

const pdf = require("html-pdf");
const pdfTemplate = require("../Controllers/Documents/index");
router.get("/Event_user/:id", AllEvent_user);
router.post("/Event_user/:idClasse/:Nombre", CreateEvent_user);
router.post("/Payment/:id", Payment);
router.post("/QrCode", QrCode);
router.post("/create-pdf", (req, res) => {
  pdf
    .create(pdfTemplate(req.body), {})
    .toFile(`${__dirname}/result.pdf`, (err) => {
      if (err) {
        res.send(Promise.reject());
      }

      res.send(Promise.resolve());
    });
});

router.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});
module.exports = router;
