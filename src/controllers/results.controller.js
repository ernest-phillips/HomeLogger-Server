const e = require("express");
const mongoose = require("mongoose");
// const { User } = require("../models/user.model");
const { Result } = require("../models/results.model");

//CREATE
const addNewResult = (req, res) => {
  let newResult = new Result(req.body);

  newResult.save((err, results) => {
    if (err) {
      res.send(err);
    }
    res.json(results);
  });
  console.log("New result added", newResult);
};

const updateResult = (req, res) => {
  console.log("The body says", req.body);
  User.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

module.exports = {
  addNewResult,
  updateResult,
};
