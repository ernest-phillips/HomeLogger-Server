const mongoose = require("mongoose");
const Joi = require("joi");


const setSchema = new mongoose.Schema({
    set: {
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
        }
    }
})

const Set = mongoose.model("set", setSchema);


module.exports = {
    Set
}