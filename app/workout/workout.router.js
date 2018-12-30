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
        console.log("Workout Router started")
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

        const validation = Joi.validate(newWorkout, WorkoutJoiSchema);
        if (validation.error) {
            console.log("Validation Error")
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                error: validation.error
            });
        }
        Workout.create(newWorkout)
            .then(createdWorkout => {
                return response.status(HTTP_STATUS_CODES.CREATED).json(createdWorkout.serialize());
            })
            .catch(error => {
                console.log(error)
                return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
            })
    })
    // jwtPassportMiddleware,

workoutRouter.get('/journal/:date', (req, res) => {
    res.sendFile('../views/home.html');
})

workoutRouter.get('/', (request, response) => {

    Workout.find()
        .then(workouts => {
            // Step 2A: Return the correct HTTP status code, and the users correctly formatted via serialization.

            return response.status(HTTP_STATUS_CODES.OK).json(
                workouts.map(workout => workout)
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

workoutRouter.get('/:user/:date', (req, res) => {

    Workout.find(req.params)
        .then(workout => {
            return res.status(HTTP_STATUS_CODES.OK).json(workout);
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

// Remove set from workout by id
workoutRouter.delete('/:workoutid', jwtPassportMiddleware, (req, res) => {
    Workout.findByIdAndDelete(req.params.workoutid)
        .then(() => {
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = {
    workoutRouter
};