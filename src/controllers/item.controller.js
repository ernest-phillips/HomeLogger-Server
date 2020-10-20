const { Item } = require("../models/item.model");
const mongoose = require("mongoose");
const { User } = require("../models/user.model");

// Create item
const addNewItem = (req, res) => {
  let newItem = new Item(req.body);
  console.log(req.body);
  newItem.home = req.params.homeID;
  console.log(newItem);
  newItem.save((err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};
// Get

const getItems = (req, res) => {
  Item.find({}, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json(item);
  });
};

const getUserItem = (req, res) => {
  let foundItem = User.find({ user: req.params._id }).populate("Item");
  res.json(foundItem);
};

const getItemID = (req, res) => {
  Item.findOne({ _id: req.params.itemID })
    // .populate("home")
    .exec((err, item) => {
      if (err) {
        res.send(err);
      }
      res.send(item);
    });
};

const deleteItem = (req, res) => {
  User.remove({ _id: req.params.itemID }, (err, item) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: `Successfully deleted item` });
  });
};
// Item.find({}, (err, item) => {
//     if (err) {
//       res.send(err);
//     }
//     res.json(item);
//   });
module.exports = { getItems, addNewItem, getUserItem, getItemID };
