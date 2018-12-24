const mongoose = require("mongoose");
const Joi = require("joi");
const dateFns = require('date-fns');
const Set = require('../sets/sets.model')

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    sets: [Set.Objectid]
});

workoutSchema.methods.serialize = function() {
    let user;
    if (typeof this.user.serialize === "function") {
        user = this.user.serialize();
    } else {
        user = this.user;
    }
    return {
        id: this._id,
        user: user,
        sets: [{
            exercise: this.exercise,
            reps: this.reps,
            weight: this.weight,
            set: this.set
        }],
        date: this.date
    };
};

const Workout = mongoose.model("workout", workoutSchema);

const WorkoutJoiSchema = Joi.object().keys({
    user: Joi.string().required(),
    sets: Joi.array().items({
        exercise: Joi.string(),
        reps: Joi.number(),
        set: Joi.number(),
        weight: Joi.number()
    }),
    date: Joi.date().min('1-1-1980')
});

module.exports = {
    Workout,
    WorkoutJoiSchema
};