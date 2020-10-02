const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { Home } = require("./home.model.js");

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
  homes: {
    type: Number,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
