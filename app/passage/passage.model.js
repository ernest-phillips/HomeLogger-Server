const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;

const passageSchema = new Schema({
  author: { type: String, required: true },
  body: { type: String, required: true },
  meta: { votes: Number }
});

passageSchema.methods.serialize = function() {
  return {
    id: this._id,
    author: this.author,
    meta: this.meta
  };
};

const PassageJoiSchema = Joi.object().keys({
  body: Joi.string()
    .alphanum()
    .min(5)
    .max(240)
    .required()
});

const Passage = mongoose.model("passage", passageSchema);

module.exports = { Passage, PassageJoiSchema };
