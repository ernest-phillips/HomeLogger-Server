// Exercises should have the following:
// 1. Name 
// 2. Bodypart 
//3. Resistence or cardiovascular activity


const mongoose = require("mongoose");
const Joi = require("joi");

const exerciseSchema = new mongoose.Schema({
    exercise: {
        type: String,
        required: true
    },
    bodypart: {
        type: String,
        required: true
    },
    ex_type: {
        type: String,
        enum: ["cardiovascular", "strength training"]
    }

});

exerciseSchema.methods.serialize = function() {

    return {
        id: this._id,
        exercise: this.exercise,
        bodypart: this.bodypart,
        ex_type: this.ex_type
    };
};

const Exercise = mongoose.model("exercise", exerciseSchema);

const ExerciseJoiSchema = Joi.object().keys({
    // user: Joi.string().optional(),
    exercise: Joi.string()
        .min(1)
        .required(),
    bodypart: Joi.string()
        .min(1)
        .required(),
    ex_type: Joi.string().min(1)
});

module.exports = {
    Exercise,
    ExerciseJoiSchema
};