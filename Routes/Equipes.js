const router = require("express").Router();

//const commentCtrl = require('../controllers/Reviews')
const {
  createEventEquipes,
  createEventClasses,
  createEventSponsors,
  updateEquipe,
  DeleteEquipe,
  updateClasse,
  DeleteClasse,
  DeleteSponsors,
  updateSponsors,
  createEventMultimedia,
} = require("../controllers/Equipes");
const upload = require("../Middleware/multervideo");

/* router.get('/comments/:id', commentCtrl.getComments) */
router.post("/Equipes/:id", upload.single("Photo"), createEventEquipes);
router.post(
  "/Eventsmultimed/:id",
  upload.fields([
    {
      name: "vidéo",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 15,
    },
  ]),
  createEventMultimedia
);
router.put("/Equipes/:idEquipe", upload.single("Photo"), updateEquipe);
router.delete("/Equipes/:idEquipe", DeleteEquipe);
router.post("/Classes/:id", upload.single("Photo"), createEventClasses);
router.put("/Classes/:idClasse", upload.single("Photo"), updateClasse);
router.delete("/Classes/:idClasse", DeleteClasse);
router.post("/Sponsor/:id", upload.single("Logo"), createEventSponsors);
router.put("/Sponsor/:idSponsors", upload.single("Logo"), updateSponsors);
router.delete("/Sponsor/:idSponsors", DeleteSponsors);
module.exports = router;
