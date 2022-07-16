const Event_user = require("../Models/Event_user");
const Events = require("../Models/Events");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const QRCode = require("qrcode");
const stripe = require("stripe")(
  "sk_test_51K2sQqKrdFLQBQmgXjRM5RpH5OCxSb9rAoUt1WsWiYKUb9cVQTG7SrvTCKDIQB0ndVSEIerijBMoZfEiBXbcHGg300xfvq4M5x"
);

exports.AllEvent_user = async (req, res) => {
  const event = await Events.find({
    "PaymentDetails.User": req.params.id,
  });
  /*   const Price = await Events.find({
    Classes: { Price: req.params.id },
  }); */
  res.status(200).json({ event });
};
exports.CreateEvent_user = async (req, res) => {
  try {
    await Events.update(
      { "Classes._id": mongoose.Types.ObjectId(req.params.idClasse) },
      {
        $set: {
          "Classes.$.NumbrePlace": parseInt(req.params.Nombre),
        },
      },

      (error, category) => {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({
            successMessage: `événement mise à jour avec succès !`,
            category,
          });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};

exports.Payment = async (req, res) => {
  const { token, subTotal, currentUser, cartItem, organizer } = req.body;
  const event = await Events.findById(req.params.id);

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.charges.create(
      {
        amount: subTotal * 100,
        currency: "EUR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotency_key: uuidv4(),
      }
    );

    if (payment) {
      const paymnt = {
        User: currentUser,
        Organizer: organizer,
        Price: subTotal,
      };
      event.PaymentDetails.push(paymnt);
      event.PaymentTotal = parseInt(event.PaymentTotal) + parseInt(subTotal);
      event.Unreserved_seat = parseInt(event.Unreserved_seat) - 1;
      event.Reserved_seat = parseInt(event.Reserved_seat) + 1;
      await event.save();
      res.send("success");
    } else res.send("failed");
  } catch (err) {
    res.status(500).json({
      err,
      errorMessage: "Veuillez réessayer plus tard",
    });
  }
};

exports.QrCode = async (req, res) => {
  let data = {
    Title: req.body.Title,
    date: req.body.date,
    Lieu: req.body.Lieu,
    Name: req.body.Name,
    LastName: req.body.LastName,
  };

  // Converting the data into String format
  let stringdata = JSON.stringify(data);

  // Print the QR code to terminal
  QRCode.toString(stringdata, { type: "terminal" }, function (err, QRcode) {
    if (err) return console.log("error occurred");

    // Printing the generated code
    /* console.log(QRcode);
    res.status(200).json(QRcode); */
  });

  // Converting the data into base64
  QRCode.toDataURL(stringdata, function (err, code) {
    if (err) return console.log("error occurred");
    res.status(200).json(code);

    // Printing the code
    console.log(code);
  });
};
