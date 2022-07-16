const mongoose = require("mongoose");
const Events = require("../Models/Events");
exports.createEventEquipes = async (req, res) => {
  const Photo = req.file;
  //   const event = await Events.find({createdBy:req.params.id}).sort({_id:-1}).limit(1);
  const event = await Events.findById(req.params.id);
  if (event) {
    const alreadyExists = event.Equipes.find(
      (r) =>
        r.FirstName === req.body.FirstName && r.Lastname === req.body.Lastname
    );

    if (alreadyExists) {
      res.status(400);
      return res.status(400).json({ errorMessage: "Le membre existe déjà" });
    }
    const equipe = {
      FirstName: req.body.FirstName,
      Lastname: req.body.Lastname,
      JobName: req.body.JobName,
      Description: req.body.Description,
      Photo: Photo,
    };

    event.Equipes.push(equipe);

    event.numEquipes = event.Equipes.length;

    await event.save();
    res.status(200).json({ successMessage: "Membre ajouté" });
  } else {
    res.status(400).json({ errorMessage: "événement introuvable" });
  }
};

exports.createEventMultimedia = async (req, res) => {
  if (!req.files) {
    req.body.vidéo = undefined;
    req.body.images = undefined;
  } else {
    req.body.vidéo = req.files.vidéo ? req.files.vidéo[0] : undefined;
  }
  const images = req.files.images;
  const event = await Events.findById(req.params.id);
  if (event) {
    event.images.push(images);
    event.vidéo.push(req.body.vidéo);
    await event.save();
    res.status(200).json({ successMessage: "Multimedia ajouté" });
  } else {
    res.status(404);
    res.status(400).json({ errorMessage: "événement introuvable" });
  }
};
exports.updateEquipe = async (req, res) => {
  const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it
  updateData.Photo = req.file;
  try {
    await Events.update(
      { "Equipes._id": mongoose.Types.ObjectId(req.params.idEquipe) },
      {
        $set: {
          "Equipes.$.FirstName": updateData.FirstName,
          "Equipes.$.Lastname": updateData.Lastname,
          "Equipes.$.JobName": updateData.JobName,
          "Equipes.$.Photo": req.file,
          "Equipes.$.Description": updateData.Description,
        },
      }
    );
    res.json({ successMessage: "Equipe Modifiée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.DeleteEquipe = async (req, res) => {
  try {
    await Events.update(
      { "Equipes._id": mongoose.Types.ObjectId(req.params.idEquipe) },

      {
        $pull: {
          Equipes: {
            _id: mongoose.Types.ObjectId(req.params.idEquipe),
          },
        },
      },
      { multi: true }
    );
    res.status(200).json({ successMessage: "Equipe Supprimé" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.createEventClasses = async (req, res, next) => {
  //  const Photo = req.file.filename;
  const Photo = req.file;
  const { ClassName, Price } = req.body;
  const event = await Events.findById(req.params.id);

  if (event) {
    /*    const alreadyExists = event.Classes.find(
        (r) => r.ClassName=== req.body.ClassName
      )
  
      if (alreadyExists) {
        return res.status(400).json({errorMessage:'la Classe existe déjà'})
      }  */
    const classe = {
      ClassName: req.body.ClassName,
      NumbrePlace: req.body.NumbrePlace,
      Price: req.body.Price,
      Photo: Photo,
    };
    event.Classes.push(classe);
    event.numClasses = event.Classes.length;
    event.Fillingrate = event.Fillingrate + parseInt(req.body.NumbrePlace);
    event.Unreserved_seat =
      event.Unreserved_seat + parseInt(req.body.NumbrePlace);

    await event.save();
    res.status(201).json({ successMessage: "Classe d'événement ajoutée" });
  } else {
    res.status(400).json({ errorMessage: "événement introuvable" });
    next;
  }
};

exports.createEventSponsors = async (req, res) => {
  // const Photo = req.file;
  const Logo = req.file;
  //   const event = await Events.find({createdBy:req.params.id}).sort({_id:-1}).limit(1);
  const event = await Events.findById(req.params.id);
  if (event) {
    const alreadyExists = event.Sponsors.find((r) => r.Name === req.body.Name);

    if (alreadyExists) {
      return res.status(400).json({ errorMessage: "le Sponsor existe déjà" });
    }
    const sponsor = {
      Logo: Logo,
      Name: req.body.Name,
      Type: req.body.Type,
    };

    event.Sponsors.push(sponsor);
    event.numSponsors = event.Sponsors.length;
    await event.save();
    res.status(200).json({ successMessage: "Sponsor d'événement ajouté" });
  } else {
    res.status(400).json({ errorMessage: "événement introuvable" });
  }
};
exports.updateClasse = async (req, res) => {
  const updateData = Object.assign({}, req.body);
  updateData.Photo = req.file; // Copy req.body in order not to change it
  try {
    await Events.update(
      { "Classes._id": mongoose.Types.ObjectId(req.params.idClasse) },
      {
        $set: {
          "Classes.$.ClassName": updateData.ClassName,
          "Classes.$.Price": updateData.Price,
        },
      }
    );
    res.json({ successMessage: "Classe Modifiée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.DeleteClasse = async (req, res) => {
  try {
    await Events.update(
      { "Classes._id": mongoose.Types.ObjectId(req.params.idClasse) },

      {
        $pull: {
          Classes: {
            _id: mongoose.Types.ObjectId(req.params.idClasse),
          },
        },
      },
      { multi: true }
    );
    res.status(200).json({ successMessage: "Classe Supprimé" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.updateSponsors = async (req, res) => {
  const updateData = Object.assign({}, req.body); // Copy req.body in order not to change it
  updateData.Logo = req.file;
  try {
    await Events.update(
      { "Sponsors._id": mongoose.Types.ObjectId(req.params.idSponsors) },
      {
        $set: {
          "Sponsors.$.Name": updateData.Name,
          "Sponsors.$.Type": updateData.Type,
          "Sponsors.$.Logo": req.file,
        },
      }
    );
    res.json({ successMessage: "Sponsors Modifiée" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.DeleteSponsors = async (req, res) => {
  try {
    await Events.update(
      { "Sponsors._id": mongoose.Types.ObjectId(req.params.idSponsors) },

      {
        $pull: {
          Sponsors: {
            _id: mongoose.Types.ObjectId(req.params.idSponsors),
          },
        },
      },
      { multi: true }
    );
    res.json({ successMessage: "Sponsors Supprimé" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
