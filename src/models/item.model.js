const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Schema = mongoose.Schema;

// consider simplifying names of object keys ie. instead of "itemLoc" use "location"
const ItemSchema = new Schema({
  user: {
    type: ObjectID,
    ref: "User",
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  price: {
    type: Number,
  },
  itemValue: {
    type: Number,
  },
  itemModel: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = { Item };
