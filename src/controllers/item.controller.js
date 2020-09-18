const { Item } = require("../models/item.model");
const mongoose = require("mongoose");
const { User } = require("../models/user.model");

// Create item
const addNewItem = (req, res) => {
  let newItem = new Item(req.body);

  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};
// Get
const getUserItem = (req, res) => {
  let foundItem = User.find({ user: req.params._id }).populate("Item");
  res.json(foundItem);
};

const getItemID = (req, res) => {
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
module.exports = { addNewItem, getUserItem, getItemID };
