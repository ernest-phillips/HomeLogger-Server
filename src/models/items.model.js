import mongoose from "mongoose";
import { ObjectID } from "mongodb";

const Schema = mongoose.Schema;

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
  imgUrl: {
    type: String,
  },
});

export const Items = mongoose.model("Items", ItemSchema);
