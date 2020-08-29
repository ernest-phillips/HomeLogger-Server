import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name",
  },
  lastName: {
    type: String,
    required: "Enter a last name",
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
  phone: {
    type: Number,
  },
  // References item schema
  items: [
    {
      type: ObjectID,
      ref: "Item",
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", UserSchema);

const ItemSchema = new Schema({
  user: {
    type: ObjectID,
    ref: "User",
  },
  itemLoc: {
    type: String,
    required: true,
  },
  itemDesc: {
    type: String,
    required: true,
  },
  itemDate: {
    type: Date,
  },
  itemPrice: {
    type: Number,
  },
  itemValue: {
    type: Number,
  },
  itemModel: {
    type: String,
    required: true,
  },
  itemSerial: {
    type: String,
  },
  imgUrl: {
    type: String,
  },
});

export const Items = mongoose.model("Items", ItemSchema);
