import { Item } from "../models/item.model";
import mongoose from "mongoose";
import { User } from "../models/user.model";

// Create item
export const addNewItem = (req, res) => {
  let newItem = new Item(req.body);

  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};
// Get
export const getUserItem = (req, res) => {
  let foundItem = User.find({ user: req.params._id }).populate("Item");
  res.json(foundItem);
};

export const getItemID = (req, res) => {
  Item.find(req.params.userID, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

// Item.find({}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item);
//   });
