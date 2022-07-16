const Notifications = require("../Models/Notification");
const Events = require("../Models/Events");

exports.getNotifications = async (req, res) => {
  try {
    const notify = await Notifications.find({ OrganizerId: req.params.id })
      .sort({ createdAt: -1 })
      .exec((error, notifyevent) => {
        if (error)
          return res
            .status(400)
            .json({ error, errorMessage: "Veuillez réessayer plus tard" });
        if (notifyevent) {
          res.status(200).json({ notifyevent });
        }
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.deleteNotifications = async (req, res) => {
  const Notification = await Notifications.find({ OrganizerId: req.params.id });
  Notification.forEach((Element) => {
    Notifications.find({ OrganizerId: req.params.id }).remove(function (err) {
      if (err) {
        console.log("Error while deleting " + err.message);
      } else {
        res.status(200).json("Notification Supprimer");
      }
    });
  });
};

exports.getAllNotifications = async (req, res) => {
  try {
    const data = [];
    const notify = await Notifications.find({
      OrganizerId: req.params.id,
    }).sort({ createdAt: -1 });

    notify.forEach(() => {
      Notifications.find({ OrganizerId: req.params.id }).remove(function (err) {
        if (err) {
          console.log("Error while deleting " + err.message);
        } else {
          console.log("Notification Supprimer");
        }
      });
    });
    res.status(200).json({ notify });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
