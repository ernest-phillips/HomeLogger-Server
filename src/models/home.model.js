const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
// const { User } = require("./user.model");

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  user: {
    type: ObjectID,
    ref: "User",
  },
  img: {
    type: String,
  },
});

const Home = mongoose.model("Home", HomeSchema);

module.exports = { Home };
