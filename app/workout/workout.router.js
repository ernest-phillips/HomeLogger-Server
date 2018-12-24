const express = require('express');
const Joi = require('joi');
const workoutRouter = express.Router();
const path = require('path');

const {
    HTTP_STATUS_CODES
} = require('../config');
const {
    jwtPassportMiddleware
} = require('../auth/auth.strategy');
const {
    Workout,
    WorkoutJoiSchema
} = require('./workout.model');

//CREATE NEW WORKOUT
workoutRouter.post('/', (request, response) => {

        const newWorkout = {
            user: request.body.user,
            sets: {
                exercise: request.body.exercise,
                reps: request.body.reps,
                weight: request.body.weight,
                set: request.body.set
            },
            date: request.body.date
        };
        console.log(newWorkout)

        const validation = Joi.validate(newWorkout, WorkoutJoiSchema);
        if (validation.error) {
            console.log("Validation Error")
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                error: validation.error
            });
        }
        Workout.create(newWorkout)
            .then(createdWorkout => {
                console.log("Workout Created")
                return response.status(HTTP_STATUS_CODES.CREATED).json(createdWorkout.serialize());
            })
            .catch(error => {
                console.log(error)
                return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
            })
    })
    // jwtPassportMiddleware,
workoutRouter.get('/', (request, response) => {
    console.log("Your Workouts")
    Workout.find()
        .then(workouts => {
            // Step 2A: Return the correct HTTP status code, and the users correctly formatted via serialization.

            return response.status(HTTP_STATUS_CODES.OK).json(
                workouts.map(workout => workout.serialize())
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

workoutRouter.get('/', )
module.exports = {
    workoutRouter
};