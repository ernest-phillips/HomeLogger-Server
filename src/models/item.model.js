import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

// consider simplifying names of object keys ie. instead of "itemLoc" use "location"
const ItemSchema = new Schema({
  user: {
    type: ObjectID,
    ref: "User",
  },Í
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
  value: {
    type: Number,
  },
  model: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
});

export const Item = mongoose.model("Item", ItemSchema);
