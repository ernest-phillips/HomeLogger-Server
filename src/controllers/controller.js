const e = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/user.model");

//CREATE
const addNewUser = (req, res) => {
  let newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

const getUsers = (req, res) => {
  User.find()
    // .populate("homes")
    .exec((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
};

// RETRIEVE One

const getUserID = (req, res) => {
  User.findById(req.params.userID)
    .populate("homes")
    .exec((err, user) => {
      if (err) {
        res.send(err);
      }
      console.log(user.homes);
      res.json(user);
    });
};

// UPDATE
const updateUser = (req, res) => {
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

// DELETE
const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `Successfully deleted user` });
  });
};

module.exports = { addNewUser, getUsers, getUserID, updateUser, deleteUser };
