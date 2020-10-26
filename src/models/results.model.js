const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("./user.model");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  user:{
    [
      first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  homes: {
    street_name: { type: String },
    city: { type: String },
    zip: { type: Number },
    square_feet: { type: Number },
    img_url: [{ type: String }],

    items: {
      desc: { type: String },
      price: { type: Number },
      img_url: [{ type: String }],
    },
  },]}
});

resultSchema.methods.serialize = function() {
  return {
    id: this._id,
    homes: this.homes,
    itesm
  }

}

const Result = mongoose.model("Result", resultSchema);

module.exports = { Result };
