const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const { User } = require("./user.model");

const Schema = mongoose.Schema;

const resultSchema = new Schema({
  results: [
    {
      users: {
        type: ObjectID,
        ref: User,
      },
    },
  ],
});

const Result = mongoose.model("Result", resultSchema);

module.exports = { Result };
