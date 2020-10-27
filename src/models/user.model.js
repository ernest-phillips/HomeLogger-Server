const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  homes: [{ type: ObjectID, ref: "Home" }],
});

UserSchema.methods.serialize = function () {
  return {
    id: this._id,
    first_name: this.first_name,
    last_name: this.last_name,
    username: this.username,
    password: this.password,
    homes: this.homes,
  };
};
const User = mongoose.model("user", UserSchema);

module.exports = { User };
