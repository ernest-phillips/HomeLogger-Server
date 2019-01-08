const express = require('express');
const Joi = require('joi');
const exerciseRouter = express.Router();
const path = require('path');

const {
    HTTP_STATUS_CODES
} = require('../config');
const {
    jwtPassportMiddleware
} = require('../auth/auth.strategy');
const {
    Exercise,
    ExerciseJoiSchema
} = require('./exercise.model');

//CREATE NEW Exercise
exerciseRouter.post('/', (request, response) => {

    const newExercise = {
        exercise: request.body.exercise,
        ex_type: request.body.ex_type,
        bodypart: request.body.bodypart
    };

    const validation = Joi.validate(newExercise, ExerciseJoiSchema);
    if (validation.error) {
        console.log("Validation Error")
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: validation.error
        });
    }

    Exercise.create(newExercise)
        .then(createdExercise => {
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdExercise.serialize());
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})


// RETRIEVE Exercises
exerciseRouter.get('/', (request, response) => {
    console.log("Retrieving All Exercises");
    Exercise.find()
        .then(exercises => {
            return response.status(HTTP_STATUS_CODES.OK).json(
                exercises.map(exercise => exercise.serialize())

            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});
// RETRIEVE ONE EXERCISE
exerciseRouter.get('/:id', (request, response) => {

    // Step 1: Attempt to retrieve a specific user using Mongoose.Model.findById()
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    Exercise.findById(request.params.id)
        .then(exercise => {
            console.log(exercise)
                // Step 2A: Return the correct HTTP status code, and the user correctly formatted via serialization.
                // return response.status(HTTP_STATUS_CODES.OK).json(user.serialize());
            return response.json(exercise);

        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = {
    exerciseRouter
};