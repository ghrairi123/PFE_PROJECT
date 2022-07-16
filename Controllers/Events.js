const Events = require("../Models/Events");
const ClassEvents = require("../Models/ClassEvents");
const EventsEquipe = require("../Models/EventsEquipe");
const EventsSponsor = require("../Models/EventsSponsor");
const EventAddons = require("../Models/EventAddons");
const Category = require("../Models/Category");
const Notifications = require("../Models/Notification");
//const EventPromo = require("../Models/EventPromo");
const mongoose = require("mongoose");
let users = mongoose.model("user");
let Account = mongoose.model("Account");
const fs = require("fs");
const pdf = require("html-pdf");
const pdfTemplate = require("./Documents/index");
/*   

		  const{
			Title,Description,Location,city,Fillingrate,StartDate,StartTime,EndTime,Promo,
		 Category,createdBy,Scategory,vidéo,images,ProfilPicture}=req.body;
		 if(StartTime>=EndTime ){
		res.status(405).json({	errorMessage: "l'heure de début doit être inférieure à l'heure de fin de l'événement"})
	  }
	   if(Date.parse(Start_date_promo) > Date.parse(End_date_promo) ){
		res.status(405).json(	{errorMessage: "la date de début doit être inférieure à la date de fin de l'événement"})
	  }
	  if(Date.parse(Start_date_promo) < Date.parse(StartDate) ){
		res.status(405).json({	errorMessage: "Ivalide date debut de promo"})
	  }
		  const events=await Events.find();
		  events.forEach(event => {       
		  if (event.Location==Location && event.city==city && (Date.parse(event.StartDate)== Date.parse(StartDate))&&(StartTime>=event.StartTime&&StartTime<=event.EndTime)) {
				 res.status(405).json({	errorMessage:"cette location est occupée à l'heure donnée"});
		  }  }) */
exports.addEvents = async (req, res, next) => {
  if (!req.files) {
    req.body.vidéo = undefined;
    req.body.images = undefined;
  } else {
    req.body.vidéo = req.files.vidéo ? req.files.vidéo[0] : undefined;
  }

  const images = req.files.images;
  /* 
  const { Location, city, StartDate, StartTime, EndTime } = req.body;
  if (StartTime >= EndTime) {
    res.status(405).json({
      errorMessage:
        "l'heure de début doit être inférieure à l'heure de fin de l'événement",
    });
  }

  const events = await Events.find();
  events.forEach((event) => {
    if (
      event.Location == Location &&
      event.city == city &&
      Date.parse(event.StartDate) == Date.parse(StartDate) &&
      StartTime >= event.StartTime &&
      StartTime <= event.EndTime
    ) {
      res.status(405).json({
        errorMessage: "cette location est occupée à l'heure donnée",
      });
    }
  }); */
  const event = new Events({
    Title: req.body.Title,
    Description: req.body.Description,
    Location: req.body.Location,
    city: req.body.city,
    StartDate: req.body.StartDate,
    StartTime: req.body.StartTime,
    EndTime: req.body.EndTime,
    images: images,
    vidéo: req.body.vidéo,
    Unreserved_seat: 0,
    createdBy: req.params.createdBy,
    Category: req.params.Category,
    Scategory: req.params.Scategory,
  });
  event
    .save()
    .then((savedEvent) => {
      console.log(savedEvent);
      return res
        .status(200)
        .json({ successMessage: `${req.body.Title} a été créé`, savedEvent });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        errorMessage: "Veuillez réessayer plus tard",
      });
    });
};

exports.ReservEvents = async (req, res, next) => {
  const event = await Events.findById(req.params.id);
  Events.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        Unreserved_seat:
          parseInt(event.Unreserved_seat) -
          parseInt(req.params.Unreserved_seat),
        Reserved_seat:
          parseInt(event.Reserved_seat) + parseInt(req.params.Unreserved_seat),
      },
    },
    (error, category) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          successMessage: `événement mise à jour avec succès !`,
          category,
        });
      }
    }
  );
};
exports.updateEvents = async (req, res) => {
  const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it

  if (!req.files) {
    updateData.vidéo = undefined;
    updateData.images = undefined;
  } else {
    updateData.vidéo = req.files.vidéo ? req.files.vidéo[0] : undefined;
  }
  updateData.images = req.files.images;
  Events.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateData,
    },
    (error, category) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          successMessage: `événement mise à jour avec succès !`,
          category,
        });
      }
    }
  );
};
exports.addClasse = async (req, res) => {
  const { ClassName, Price } = req.body;
  try {
    const evt = await Events.find({ createdBy: req.params.id })
      .sort({ _id: -1 })
      .limit(1);
    evt.forEach((Element) => {
      ClassEvents.findOne({
        Event_id: Element._id,
        ClassName: req.body.Classname,
      }).then((Clas) => {
        if (!Clas) {
          const classe = new ClassEvents({
            ClassName: ClassName,
            Price: Price,
            Event_id: Element._id,
          });
          classe.save();
          res.status(200).json({
            successMessage: `${Classname} a été créé`,
            classe,
          });
        } else {
          res.status(405).json({ errorMessage: `${Classname} Existe dèjà` });
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.addEquipe = async (req, res) => {
  try {
    const image = req.file.filename;
    console.log(image);

    const evt = await Events.find({ createdBy: req.params.id })
      .sort({ _id: -1 })
      .limit(1);
    evt.forEach((Element) => {
      console.log(Element._id);
      EventsEquipe.findOne({
        Event_id: Element._id,
        FirstName: req.body.FirstName,
        Lastname: req.body.Lastname,
      }).then((eqp, error) => {
        console.log(eqp);
        if (!eqp) {
          const equipe = new EventsEquipe({
            FirstName: req.body.FirstName,
            Photo: image,
            Lastname: req.body.Lastname,
            JobName: req.body.JobName,
            Description: req.body.Description,
            Event_id: Element._id,
          });
          equipe.save();
          return res.status(200).json({
            successMessage: `${req.body.FirstName} ${req.body.Lastname}  a été créé`,
            equipe,
          });
        } else {
          return res.status(405).json({
            errorMessage: `${req.body.FirstName} ${req.body.Lastname} Existe dèjà`,
          });
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.addSponsors = async (req, res) => {
  const { Name, Type } = req.body;
  const Logo = req.file.filename;
  try {
    const evt = await Events.find({ createdBy: req.params.id })
      .sort({ _id: -1 })
      .limit(1);
    evt.forEach((Element) => {
      console.log(Element._id);
      EventsSponsor.findOne({
        Event_id: Element._id,
        Name: req.body.Name,
      }).then((spn, error) => {
        if (!spn) {
          const sponsor = new EventsSponsor({
            Name: Name,
            Type: Type,
            Logo: Logo,
            Event_id: Element._id,
          });
          sponsor
            .save()
            .then((savedSponsorsEvent) => {
              res.status(200).json({
                successMessage: `${req.body.Name}  créé`,
                sponsor,
              });
            })
            .catch((err) => {
              res.status(500).json({
                err,
                errorMessage: "Veuillez réessayer plus tard",
              });
            });
        } else {
          return res
            .status(405)
            .json({ errorMessage: `${req.body.Name} Existe dèjà` });
        }
      });
    });
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.getadd = async (req, res) => {
  const evt = await Events.find({ createdBy: req.params.id })
    .sort({ _id: -1 })
    .limit(1);
};
exports.addAddons = async (req, res) => {
  const { Name, Price, Number } = req.body;
  const image = req.file;
  try {
    const evt = await Events.find({ createdBy: req.params.id })
      .sort({ _id: -1 })
      .limit(1);
    evt.forEach((Element) => {
      EventAddons.findOne({ Event_id: Element._id, Name: req.body.Name }).then(
        (addn, error) => {
          if (!addn) {
            const addons = new EventAddons({
              Name: Name,
              Price: Price,
              Number: Number,
              image: image,
              Event_id: Element._id,
            });
            addons.save();
            res.status(200).json({
              successMessage: `${Name} créé avec Succés`,
              addons,
            });
          } else {
            return res
              .status(405)
              .json({ errorMessage: `${Name} Existe dèjà` });
          }
        }
      );
    });
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.getClasse = async (req, res) => {
  const events = await Events.findById(req.params.id);
  await ClassEvents.find({ Event_id: events._id })
    .sort({ Price: 1 })
    .exec((error, classe) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (classe) {
        res.status(200).json({ classe });
      }
    });
};
exports.getAddons = async (req, res) => {
  const events = await Events.findById(req.params.id);
  await EventAddons.find({ Event_id: events._id }).exec((error, addons) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (addons) {
      res.status(200).json({ addons });
    }
  });
};
exports.getEquipe = async (req, res) => {
  const events = await Events.findById(req.params.id);
  await EventsEquipe.find({ Event_id: events._id }).exec((error, equipe) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (equipe) {
      res.status(200).json({ equipe });
    }
  });
};
exports.getSponsors = async (req, res) => {
  const events = await Events.findById(req.params.id);
  await EventsSponsor.find({ Event_id: events._id }).exec((error, sponsor) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (sponsor) {
      res.status(200).json({ sponsor });
    }
  });
};
exports.getEvents = async (req, res) => {
  Events.find({ Validate: 1 })
    .sort({ createdAt: -1 })
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};

exports.getEvent = async (req, res) => {
  const PAGE_SIZE = 9;
  const page = parseInt(req.query.page || "0");
  const total = await Events.countDocuments({});
  Events.find({ Validate: 1 })
    .sort({ createdAt: -1 })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res
          .status(200)
          .json({ totalPages: Math.ceil(total / PAGE_SIZE), Event });
      }
    });
};
exports.getEventsBytitle = async (req, res) => {
  const event = await Events.find({
    Title: req.params.Title,
    createdBy: req.params.id,
  });
  res.status(200).json({ data: event });
};

exports.getEventsBytitleAdmin = async (req, res) => {
  const event = await Events.findOne({
    Title: req.params.Title,
    Validate: 1,
    Scategory: req.params.id,
  });
  res.status(200).json({ event });
};

exports.getEventstt = async (req, res) => {
  const event = await Events.find({}).sort({ createdAt: -1 });
  res.status(200).json({ event });
};

exports.getAllEvents = async (req, res) => {
  Events.find({ Validate: 1 })
    .sort({ createdAt: -1 })
    .limit(9)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.getTodayEvents = async (req, res) => {
  Events.find({ Validate: 1 }).exec((error, Event) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (Event) {
      res.status(200).json({ Event });
    }
  });
};
exports.getEventsById = async (req, res) => {
  Events.findById(req.params.id).exec((error, Event) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (Event) {
      res.status(200).json({ Event });
    }
  });
};
exports.getLastEventsById = async (req, res) => {
  Events.find({ createdBy: req.params.id })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.getSortEvents = async (req, res) => {
  Events.find({ createdBy: req.params.id })
    .sort({ numReviews: -1 })
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.AccepteEvents = async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { Validate: "1" } }
    );

    const notification = new Notifications({
      OrganizerId: event.createdBy,
      Event_Name: event.Title,
      Event_Location: event.Location,
      Event_Fellingrate: event.Fillingrate,
      Event_City: event.city,
      Event_StartDate: event.StartDate,
      type: true,
      message: "votre demande de publication a été acceptée",
      Event_Id: event._id,
    });
    notification.save();
    res.status(200).json({ successMessage: "Evénement Acceptée", event });
  } catch (error) {
    return res.status(500).json({ errorMessage: error.message });
  }
};
exports.deleteEvents = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedEvents = await Events.findByIdAndDelete(itemId);
    const notification = new Notifications({
      OrganizerId: deletedEvents.createdBy,
      Event_Name: deletedEvents.Title,
      Event_Location: deletedEvents.Location,
      Event_Fellingrate: deletedEvents.Fillingrate,
      Event_City: deletedEvents.city,
      Event_StartDate: deletedEvents.StartDate,
      type: false,
      message: "votre demande de publication a été refusée",
      Event_Id: deletedEvents._id,
    });
    notification.save();

    res.status(200).json({ deletedEvents });
  } catch (err) {
    console.log(err, "CategoryController.delete error");
    res.status(500).json({
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedEvents = await Events.findByIdAndDelete(itemId);

    res.status(200).json({ deletedEvents });
  } catch (err) {
    console.log(err, "CategoryController.delete error");
    res.status(500).json({
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};
exports.ShowEventsparCategory = async (req, res) => {
  await Events.find({ Category: req.params.id, Validate: 1 })
    .sort({ createdAt: -1 })

    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};

exports.ShowAllEventsparCategory = async (req, res) => {
  await Events.find({ Category: req.params.id })
    .sort({ createdAt: -1 })

    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};

exports.ShowRequestEventsparCategory = async (req, res) => {
  await Events.find({
    Category: req.params.id,
    Validate: 0,
  })
    .sort({ createdAt: -1 })

    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};
exports.ShowEventsparCategorybyorganizer = async (req, res) => {
  await Events.find({ Category: req.params.id, createdBy: req.params.idOrg })
    .sort({ createdAt: -1 })

    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};
exports.threeEvents = async (req, res) => {
  const category = await Category.findById(req.params.id);
  await Events.find({ Category: category._id, Validate: 1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    })
    .sort({ createdAt: -1 })
    .limit(3);
};
exports.ShowRequestEvents = async (req, res) => {
  const data = [];
  const category = await Category.find();
  const events = await Events.find();
  events.forEach((Element) => {
    category.forEach((item) => {
      if (
        item._id.toString() == Element.Category.toString() &&
        Element.Validate == 0
      ) {
        const data1 = {
          categoryname: item.name,
          categoryId: item._id,
          categoryImage: item.fileName,
          Title: Element.Title,
          Description: Element.Description,
          Location: Element.Location,
          city: Element.city,
          Unreserved_seat: Element.Unreserved_seat,
          Fillingrate: Element.Fillingrate,
          Classes: Element.Classes,
          Equipes: Element.Equipes,
          Sponsors: Element.Sponsors,
          StartDate: Element.StartDate,
          StartTime: Element.StartTime,
          EndTime: Element.EndTime,
          createdBy: Element.createdBy,
          images: Element.images,
          ProfilPicture: Element.ProfilPicture,
          vidéo: Element.vidéo,
          _id: Element._id,
        };
        data.push(data1);
      }
    });
  });
  res.status(200).json({ data });
};
exports.ShowThreeRequestEvents = async (req, res) => {
  const validate = 0;
  await Events.find({ Validate: 0 })
    .exec((error, docs) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (docs) {
        res.status(200).json(docs);
      }
    })
    .sort({ createdAt: -1 })
    .limit(3);
};
exports.ShowOrganizersparEvents = async (req, res) => {
  const Event = await Events.findById(req.params.id);
  await users.find({ account: Event.createdBy }).exec((error, organizer) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (organizer) {
      res.status(200).json({ organizer });
    }
  });
};
exports.GET_EVENT_EN_PROMO = async (req, res) => {
  const event = await Events.findById(req.params.id);
  if (event.Promo) {
    /* await EventPromo.find({Event:event._id}).exec((error, promo) => {
			if (error) return res.status(400).json({ error ,	errorMessage: 'Veuillez réessayer plus tard'});
			if (promo) {			  
			  res.status(200).json({ promo });
			}	});  */
  }
};
exports.GET_Account_User = async (req, res) => {
  await Account.findById(req.params.id).exec((error, account) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (account) {
      res.status(200).json({ account });
    }
  });
};
exports.GET_MY_EVENT = async (req, res) => {
  await Events.find({ createdBy: req.params.id /* , Validate: 1, Status: 1 */ })
    .sort({ createdAt: -1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};

exports.GET_organ_EVENT = async (req, res) => {
  await Events.find({ createdBy: req.params.id, Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};
exports.PENDING_EVENTS = async (req, res) => {
  const PAGE_SIZE = 5;
  const page = parseInt(req.query.page || "0");
  const total = await Events.countDocuments({});
  await Events.find({ createdBy: req.params.id, Validate: 0, Status: 1 })
    .sort({ createdAt: -1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res
          .status(200)
          .json({ totalPages: Math.ceil(total / PAGE_SIZE), event });
      }
    });
};
exports.DRAFT_EVENTS = async (req, res) => {
  await Events.find({ createdBy: req.params.id, Validate: 1, Status: 0 })
    .sort({ createdAt: -1 })
    .exec((error, event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (event) {
        res.status(200).json({ event });
      }
    });
};
exports.DeleteEvt = async (req, res) => {
  try {
    await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { Status: "0" } }
    );
    res.status(200).json({ successMessage: "Evénement Suprimée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.ReactivateEvt = async (req, res) => {
  try {
    await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { Status: "1" } }
    );
    res.status(200).json({ successMessage: "Evénement réactivée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.reviews = async (req, res) => {
  try {
    const { rating } = req.body;

    if (rating && rating !== 0) {
      const event = await Events.findById(req.params.id);
      if (!event) return res.status(400).json({ msg: "event does not exist." });

      let num = event.numReviews;
      let rate = event.rating;

      await Events.findOneAndUpdate(
        { _id: req.params.id },
        {
          rating: rate + rating,
          numReviews: num + 1,
        }
      );

      res.json({ msg: "Update success" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.get_ten_Events = async (req, res) => {
  Events.find({ Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .limit(10)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.get_twenty_Events = async (req, res) => {
  Events.find({ Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .limit(20)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};

exports.get_one_hundred_Events = async (req, res) => {
  Events.find({ Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .limit(100)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};

exports.get_fifty_Events = async (req, res) => {
  Events.find({ Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .limit(50)
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.get_N_Events = async (req, res) => {
  const number = req.params.number;
  Events.find({ Validate: 1, Status: 1 })
    .sort({ createdAt: -1 })
    .limit(parseInt(number))
    .exec((error, Event) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (Event) {
        res.status(200).json({ Event });
      }
    });
};
exports.get_Events_By_price = async (req, res) => {
  const Price = await Events.find({
    /*     $where: "Classes.Price > 1"  */
    Validate: 1,
    "Classes.Price": { $lte: req.params.id },
    "Classes.Price": { $gte: req.params.maxid },
  });
  /*   const Price = await Events.find({
    Classes: { Price: req.params.id },
  }); */
  res.status(200).json({ Price });
};
exports.get_Events_By_price_2 = async (req, res) => {
  const Clas = await ClassEvents.find();
  Clas.forEach((Element) => {
    if (Element.Price >= 20 && Element.Price < 30) {
      const evt = Events.findById(Element.Event_id);
    } else {
      res
        .status(403)
        .json({ errorMessage: "L'événement n'existe pas pour ce prix" });
    }
  });
};
exports.get_Events_By_price_3 = async (req, res) => {
  const Clas = await ClassEvents.find();
  Clas.forEach((Element) => {
    if (Element.Price >= 30 && Element.Price <= 50) {
      const evt = Events.findById(Element.Event_id);
      res.status(200).json({ evt });
    } else {
      res
        .status(403)
        .json({ errorMessage: "L'événement n'existe pas pour ce prix" });
    }
  });
};

exports.get_Events_By_price_4 = async (req, res) => {
  const Clas = await ClassEvents.find(Price > 50);
  console.log(Clas);
  Clas.forEach((element) => {
    Events.findById(element.Event_id).exec((error, evnt) => {
      if (error)
        return res
          .status(400)
          .json({ error, errorMessage: "Veuillez réessayer plus tard" });
      if (evnt) {
        return res.status(200).json({ evnt });
      }
    });
  });
};

exports.maximumRev = async (req, res) => {
  const evnt = await Events.find().sort({ rating: -1 }).limit(1);

  evnt.forEach(async (elmnt) => {
    const user = await users.findById(elmnt.createdBy);

    res.status(200).json({ data: user });
  });
};

exports.maximumRevevt = async (req, res) => {
  const evnt = await Events.find().sort({ rating: -1 }).limit(1);

  res.status(200).json({ data: evnt });
};

exports.Show = async (req, res) => {
  const data = [];
  const evnts = await Events.find();
  const user = await users.find();
  evnts.forEach((Element) => {
    Element.PaymentDetails.forEach((elmnt) => {
      user.forEach((item) => {
        if (
          Element._id.toString() == req.params.id &&
          item._id.toString() == elmnt.User.toString()
        ) {
          const data1 = {
            Name: item.Name,
            LastName: item.LastName,
            Image: item.Photo,
            Prix: elmnt.Price,
          };
          data.push(data1);
        }
      });
    });
  });
  res.json({ data: data });
};
