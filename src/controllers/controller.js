import mongoose from "mongoose";
import { User, Items } from "../models/model";

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

// Create Items
export const addNewItem = (req, res) => {
  let newItem = new Items(req.body);

  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};
// Get
export const getItems = (req, res) => {
  Items.find({}, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

export const getItemID = (req, res) => {
  Items.findById(req.params.itemID, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};
