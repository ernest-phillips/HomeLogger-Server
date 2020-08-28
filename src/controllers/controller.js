import mongoose from "mongoose";
import { User } from "../models/model";

//CREATE
export const addNewUser = (req, res) => {
  let newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
// RETRIEVE many
export const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
// RETRIEVE One
export const getUserID = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
// UPDATE
export const updateUser = (req, res) => {
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
export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `Successfully deleted user` });
  });
};
