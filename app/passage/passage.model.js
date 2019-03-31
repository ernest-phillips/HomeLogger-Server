const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const passageSchema = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  votes: { type: Number }
});

passageSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.author,
    body: this.body,
    votes: this.votes
  };
};

const PassageJoiSchema = Joi.object().keys({
  body: Joi.string()
    .min(5)
    .max(500)
    .required(),
  author: Joi.string(),
  votes: Joi.number()
});

const Passage = mongoose.model("passage", passageSchema);

module.exports = { Passage, PassageJoiSchema };
