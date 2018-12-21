// Workouts should have:
// 1. A Date
// 2. at least one exercise
// 3. at least one reps entered
// 4. at least one set entered
//5. a note that can be left blank
//6. the amount of weight used in the set
// https://en.wikipedia.org/wiki/List_of_weight_training_exercises
const mongoose = require("mongoose");
const Joi = require("joi");

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  exercise: { type: String, required: true },
  set: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number },
  date: { type: Date }
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
    exercise: this.exercise,
    reps: this.reps,
    weight: this.weight,
    date: this.date
  };
};

const Workout = mongoose.model("workout", workoutSchema);

const WorkoutJoiSchema = Joi.object().keys({
  user: Joi.string().optional(),
  exercise: Joi.string()
    .min(1)
    .required(),
  reps: Joi.number()
    .min(1)
    .required(),
<<<<<<< HEAD
  weight: Joi.number().min(1)
=======
  weight: Joi.number().min(1),
  date: Joi.date()
>>>>>>> c67b88e6bca7463a4270d6b72836ffa09870c8f9
});

module.exports = { Workout };
