const mongoose = require("mongoose");
const Joi = require("joi");


const setSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
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
        type: Date,
        default: Date.now
    }
});
setSchema.methods.serialize = function() {
    return {
        user: this.user,
        exercise: this.exercise,
        reps: this.reps,
        weight: this.weight,
        set: this.set,
        date: this.date
    }
}
const Set = mongoose.model("set", setSchema);
const SetJoiSchema = Joi.object({
    user: Joi.string().required(),
    exercise: Joi.string(),
    reps: Joi.number(),
    set: Joi.number(),
    weight: Joi.number()
})

module.exports = {
    Set,
    setSchema,
    SetJoiSchema
}