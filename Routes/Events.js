const Events = require("../Models/Events");
const express = require("express");
const cate = require("../Models/Category");
const {
  getEvents,
  deleteEvents,
  AccepteEvents,
  addClasse,
  getClasse,
  addEquipe,
  getSponsors,
  getEquipe,
  addSponsors,
  getAddons,
  addAddons,
  getadd,
  ShowEventsparCategory,
  GET_EVENT_EN_PROMO,
  ShowOrganizersparEvents,
  GET_Account_User,
  ShowRequestEvents,
  ShowThreeRequestEvents,
  GET_MY_EVENT,
  GET_organ_EVENT,
  PENDING_EVENTS,
  DRAFT_EVENTS,
  DeleteEvt,
  ReactivateEvt,
  reviews,
  threeEvents,
  get_ten_Events,
  get_fifty_Events,
  get_one_hundred_Events,
  get_twenty_Events,
  get_Events_By_price,
  get_Events_By_price_2,
  get_Events_By_price_3,
  get_Events_By_price_4,
  addEvents,
  getEventsBytitle,
  getSortEvents,
  getEventsById,
  getEvent,
  getLastEventsById,
  getAllEvents,
  get_N_Events,
  updateEvents,
  ReservEvents,
  maximumRev,
  maximumRevevt,
  deleteEvent,
  getEventstt,
  ShowAllEventsparCategory,
  ShowEventsparCategorybyorganizer,
  ShowRequestEventsparCategory,
  Show,
  getEventsBytitleAdmin,
} = require("../Controllers/Events");
const upload = require("../Middleware/multervideo");
const upload2 = require("../Middleware/multer");
const { verifyAdmin } = require("../Middleware/auth");
const router = express.Router();

router.post(
  "/Events/:createdBy/:Category/:Scategory",
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
  addEvents
);

router.put(
  "/Events/:id",
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
  updateEvents
);
router.get("/ShowRequestEventsparCategory/:id", ShowRequestEventsparCategory);
router.get("/getEventsBytitleAdmin/:Title/:id", getEventsBytitleAdmin);
router.get("/ShowEvnt/:id", Show);
router.put("/ReservEvents/:id/:Unreserved_seat", ReservEvents);
router.get("/ten_Events", get_ten_Events);
router.get("/getEventstt", getEventstt);
router.get("/maximumRev", maximumRev);
router.get("/maximumRevevt", maximumRevevt);
router.get("/AllEvents", getAllEvents);
router.get("/Event", getEvent);
router.get("/EventsBytitle/:Title/:id", getEventsBytitle);
router.get("/NEvents/:number", get_N_Events);
router.get("/Events_By_price/:id/:maxid", get_Events_By_price);
router.get("/Events_By_price20", get_Events_By_price_2);
router.get("/Events_By_price30", get_Events_By_price_3);
router.get("/Events_By_price50", get_Events_By_price_4);
router.get("/fifty_Events", get_fifty_Events);
router.get("/one_hundred_Events", get_one_hundred_Events);
router.get("/twenty_Events", get_twenty_Events);
router.get("/Events", getEvents);
router.get("/Events/:id", getEventsById);
router.get("/LastEvents/:id", getLastEventsById);
router.get("/SortEvents/:id", getSortEvents);
router.get("/Class/:id", getClasse);
router.get("/MyEvent/:id", GET_MY_EVENT);
router.get("/organ_EVENT/:id", GET_organ_EVENT);

router.get("/PENDING_EVENTS/:id", PENDING_EVENTS);
router.get("/DRAFT_EVENTS/:id", DRAFT_EVENTS);
router.get("/Equipe/:id", getEquipe);
router.get("/accountuser/:id", GET_Account_User);
router.get("/ShowEventsparCategory/:id", ShowEventsparCategory);
router.get(
  "/ShowEventsparCategorybyorganizer/:id/:idOrg",
  ShowEventsparCategorybyorganizer
);
router.get("/ShowAllEventsparCategory/:id", ShowAllEventsparCategory);

router.get("/RequestEvents", ShowRequestEvents);
router.get("/ThreeRequestEvents", ShowThreeRequestEvents);
router.get("/ThreeEvents/:id", threeEvents);
router.get("/Addons/:id", getAddons);
router.get("/Sponsors/:id", getSponsors);
router.get("/promo/:id", GET_EVENT_EN_PROMO);
router.get("/ShowOrganizersparEvents/:id", ShowOrganizersparEvents);
router.post("/AcceptEvents/:id", AccepteEvents);
router.post("/Equipe/:id", upload.single("Photo"), addEquipe);
router.post("/Addons/:id", upload.single("image"), addAddons);
router.get("/getadd/:id", getadd);
router.post("/Sponsors/:id", upload.single("Logo"), addSponsors);
//router.post("/Class/:id", addClasse);
router.delete("/Events/:itemId", deleteEvents);
router.delete("/deleteEvent/:itemId", deleteEvent);

router.post("/DeleteEvt/:id", DeleteEvt);
router.post("/ReactivateEvt/:id", ReactivateEvt);
router.patch("/Events/:id", reviews);

module.exports = router;
