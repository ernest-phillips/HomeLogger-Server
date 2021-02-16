const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { Home } = require("./home.model.js");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;
const userID = uuidv4();

const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  homes: [{ type: ObjectID, ref: "Home" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
