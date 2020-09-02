import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Items } from "../models/items.model.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
