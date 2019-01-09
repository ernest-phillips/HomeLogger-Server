const mongoose = require("mongoose");
const Joi = require("joi");

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date
    },
    sets: {
        exercise: {
            type: String,
            required: true
        },
        set: {
            type: Number,
            required: true
        },
        reps: {
            type: Number,
            required: true
        },
        weight: {
            type: Number
        },
        date: {
            type: Date
        }
    }
});


workoutSchema.methods.serialize = function() {
    let user;
    if (typeof this.user.serialize === "function") {
        user = this.user.serialize();
    } else {
        user = this.user;
    }

    return {
        user: this.user,
        sets: {
            exercise: this.exercise,
            reps: this.reps,
            weight: this.weight
        },
        date: this.date
    };
};


const Workout = mongoose.model("workout", workoutSchema);

const WorkoutJoiSchema = Joi.object().keys({
    user: Joi.string().required(),
    sets: Joi.object({
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