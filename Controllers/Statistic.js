const Account = require("../models/account");
const Invitation = require("../models/Invitations");
const Events = require("../Models/Events");
const Category = require("../Models/Category");
const Event_user = require("../Models/Event_user");

exports.getTypeUser = async (req, res, next) => {
  const organisator = await Account.findOne({ role: "organisateur" }).count();
  const client = await Account.findOne({ role: "client" }).count();
  res.status(200).json({ organisator, client });
};
exports.getNewOrganizer = async (req, res, next) => {
  const Invit = await Invitation.find().count();
  res.status(200).json({ Invit });
};
exports.ShowEventsparCategory = async (req, res) => {
  // const category=await
  const event = await Events.find({
    Scategory: req.params.id,
    Validate: 1,
  }).count();
  res.status(200).json({ event });
};
exports.ShowEventsparCategory2 = async (req, res) => {
  const category = await Category.find({ parentId: null });
  let evt;
  const data = [];
  const event = await Events.find({ Validate: 1 });

  category.forEach(async (item) => {
    event.forEach(async (Element) => {
      if (Element.Scategory.toString() == item._id.toString()) {
        evt = await Events.find().count();
        const data1 = {
          Name: item.name,
          number: evt,
        };

        data.push(data1);
        //  console.log(data)
      }
    });

    res.status(200).json(data);
  });
  //  console.log(data)
};
exports.UPCOMING_EVENTS = async (req, res) => {
  const start = Date.now();
  const event = await Events.find({ Validate: 1 }).exec((error, event) => {
    if (error)
      return res
        .status(400)
        .json({ error, errorMessage: "Veuillez réessayer plus tard" });
    if (Date.parse(event.StartDate.getTime()) >= start.getTime()) {
      res.status(200).json({ event });
    }
  });
};
exports.EVENTS_Pert = async (req, res) => {
  const Data = [];
  const event = await Events.find({ Validate: 1 })
    .sort({ createdAt: -1 })
    .limit(5);
  event.forEach(async (item) => {
    const data1 = {
      Title: item.Title,
      deff: parseFloat(item.Fillingrate / item.Unreserved_seat),
    };
    Data.push(data1);
  });
  Data.sort(); // [1, 2, 3]

  console.log(Data);
  res.status(200).json(Data);
};
exports.newUsersEachMonth = async (req, res) => {
  const newUsersEachMonth = await Account.aggregate([
    {
      $project: {
        month_joined: { $month: "$createdAt" },
        name: "$_id",
        _id: 0,
      },
    },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Fév",
                "Mar",
                "Avr",
                "Mai",
                "Jun",
                "juil",
                "août",
                "sep",
                "oct",
                "nov",
                "déc",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month_joined"],
            },
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(newUsersEachMonth);
};
exports.newEvntsEachMonth = async (req, res) => {
  const newEvntsEachMonth = await Events.aggregate([
    { $match: { Validate: 1 } },
    {
      $project: {
        month_joined: { $month: "$createdAt" },
        name: "$_id",
        _id: 0,
      },
    },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Fév",
                "Mar",
                "Avr",
                "Mai",
                "Jun",
                "juil",
                "août",
                "sep",
                "oct",
                "nov",
                "déc",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month_joined"],
            },
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(newEvntsEachMonth);
};
exports.newInvitationsEachMonth = async (req, res) => {
  const newInvitationsEachMonth = await Invitation.aggregate([
    {
      $project: {
        month_joined: { $month: "$createdAt" },
        name: "$_id",
        _id: 0,
      },
    },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Fév",
                "Mar",
                "Avr",
                "Mai",
                "Jun",
                "juil",
                "août",
                "sep",
                "oct",
                "nov",
                "déc",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month_joined"],
            },
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(newInvitationsEachMonth);
};
exports.MaxReviews = async (req, res) => {
  Events.find()
    .sort({ rating: -1 })
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
exports.EVENTS_Pert_Organizer = async (req, res) => {
  const Data = [];
  const event = await Events.find({ Validate: 1, createdBy: req.params.id })
    .sort({ createdAt: -1 })
    .limit(5);
  event.forEach(async (item) => {
    const data1 = {
      Title: item.Title,
      deff: parseFloat(item.Fillingrate / item.Unreserved_seat),
    };
    Data.push(data1);
  });
  Data.sort(); // [1, 2, 3]

  console.log(Data);
  res.status(200).json(Data);
};
exports.TicketSalesEachMonth = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const TicketSalesEachMonth = await Events.aggregate([
    {
      $match: {
        "PaymentDetails.Organizer": new ObjectID(req.params.id),
      },
    },
    {
      $project: {
        month_joined: { $month: "$createdAt" },
        name: "$_id",
        _id: 0,
      },
    },
    { $group: { _id: { month_joined: "$month_joined" }, number: { $sum: 1 } } },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Fév",
                "Mar",
                "Avr",
                "Mai",
                "Jun",
                "juil",
                "août",
                "sep",
                "oct",
                "nov",
                "déc",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month_joined"],
            },
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(TicketSalesEachMonth);
};
exports.PriceEachMonth = async (req, res) => {
  var ObjectID = require("mongodb").ObjectID;
  const TicketSalesEachMonth = await Events.aggregate([
    {
      $match: {
        createdBy: new ObjectID(req.params.id),
      },
    },
    {
      $project: {
        month_joined: { $month: "$createdAt" },
        name: "$_id",
        PaymentTotal: "$PaymentTotal",
        _id: 0,
      },
    },
    {
      $group: {
        _id: { month_joined: "$month_joined" },
        totalPrice: { $sum: { $toDouble: "$PaymentTotal" } },
      },
    },
    {
      $addFields: {
        month: {
          $let: {
            vars: {
              monthsInString: [
                ,
                "Jan",
                "Fév",
                "Mar",
                "Avr",
                "Mai",
                "Jun",
                "juil",
                "août",
                "sep",
                "oct",
                "nov",
                "déc",
              ],
            },
            in: {
              $arrayElemAt: ["$$monthsInString", "$_id.month_joined"],
            },
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.status(200).json(TicketSalesEachMonth);
};
