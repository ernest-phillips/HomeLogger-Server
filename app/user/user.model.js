const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.serialize = function() {
  return {
    id: this._id,
    email: this.email,
    username: this.username
  };
};

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.generateAuthToken = function() {};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

const UserJoiSchema = Joi.object().keys({
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .trim()
    .required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .trim()
    .required(),
  email: Joi.string()
    .email()
    .trim()
    .required()
});

const User = mongoose.model("user", userSchema);
module.exports = {
  User,
  UserJoiSchema
};
