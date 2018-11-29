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
workoutRouter.post('/', jwtPassportMiddleware, (request, response) => {
    console.log(request.body)
    const newWorkout = {
        user: request.user.id,
        exercise: request.body.exercise,
        reps: request.body.reps,
        weight: request.body.weight,
        set: request.body.set
    };

    const validation = Joi.validate(newWorkout, WorkoutJoiSchema);
    if (validation.error) {
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: validation.error
        });
    }

    Workout.create(newWorkout)
        .then(createdWorkout => {
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdWorkout.serialize());
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })
})
workoutRouter.get('/', (request, response) => {
    response.sendFile(path.resolve('./app/views/auth/home.html'));
    // response.send('Text here')
})

module.exports = {
    workoutRouter
};