const express = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/user.model");
const { Result } = require("../models/results.model");

//CREATE
const addNewUser = (req, res) => {
  let newUser = new Result(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
  console.log("New User:", newUser);
};

const getUsers = (req, res) => {
  console.log(Result);
  Result.find()
    // .populate("homes")
    .exec((err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
};

// RETRIEVE One

const getUser = (req, res) => {
  Result.findById(req.params.userID)
    // .populate("homes")
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

// DELETE
const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `Successfully deleted user` });
  });
};

module.exports = { addNewUser, getUsers, getUser, updateUser, deleteUser };
