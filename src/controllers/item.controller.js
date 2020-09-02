import { Items } from "../models/items.model";
import mongoose from "mongoose";
import { User } from "../models/user.model";

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
export const getUserItems = (req, res) => {
  Items.find({}, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

export const getItemID = (req, res) => {
  let resj = res.json();

  Items.find(req.params.userID, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  }).populate(Items);
};
