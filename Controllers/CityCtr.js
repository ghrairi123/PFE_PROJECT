const express = require("express");
var router = express.Router();
var ObjectID = require("mongoose").Types.ObjectId;

var { City } = require("../models/city");

exports.getcity=(req, res) => {
  City.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while retrieving all records : " +
          JSON.stringify(err, undefined, 2)
      );   
  });
};

exports.postcity=(req, res) => {
    const {name}=req.body;
    City.findOne({name}).exec(async (error, ville) => {
        if(ville) 
            return res.status(400).json({
               error:"Ville existe déja "
           })
    else{
  var newRecord = new City({
    name: req.body.name,
  });

  newRecord.save((err, docs) => {
    if (!err){
      res.send(docs);
    /*  res
      .status(200)
      .json({ message: { msgBody: "Successfully created", msgError: false } }); */
    } 
    else {
       res
      .status(500)
      .json({ message: { msgBody: "Error has occured", msgError: true } }); 
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
    }
      
  });
} }); 
};

exports.putcity=(req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  var updatedRecord = {
    name: req.body.name,
  };

  City.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else
        console.log(
          "Error while updating a record : " + JSON.stringify(err, undefined, 2)
        );
    }
  );
};

exports.deletecity=(req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("No record with given id : " + req.params.id);

  City.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while deleting a record : " + JSON.stringify(err, undefined, 2)
      );
  });
};

