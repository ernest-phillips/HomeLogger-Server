const mongoose = require("mongoose");
const { User } = require("../models/home.model");
const { Home } = require("../models/home.model");

//CREATE
const addNewHome = (req, res) => {
  let newHome = new Home(req.body);
  newHome.user = req.params.userID;

  newHome.save((err, home) => {
    if (err) {
      res.send(err);
    }
    res.json(home);
  });
};
// RETRIEVE many
const getHomes = (req, res) => {
  Home.find({}, (err, home) => {
    if (err) {
      res.send(err);
    }
    res.json(home);
  });
};

const getHomeID = (req, res) => {
  Home.findById(req.params.homeID)
    .populate("items")
    .exec((err, home) => {
      console.log("populated", home.populated("items"));
      if (err) {
        res.send(err);
      }
      res.json(home);
    });
};
// UPDATE
const updateHome = (req, res) => {
  Home.findOneAndUpdate(
    { _id: req.params.homeID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, home) => {
      if (err) {
        res.send(err);
      }
      res.json(home);
    }
  );
};

// DELETE
const deleteHome = (req, res) => {
  Home.remove({ _id: req.params.homeID }, (err, home) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `Successfully deleted home` });
  });
};

module.exports = { addNewHome, getHomes, getHomeID, updateHome, deleteHome };
