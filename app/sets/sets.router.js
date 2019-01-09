const express = require('express');
const Joi = require('joi');
const setsRouter = express.Router();
const path = require('path');

const {
    HTTP_STATUS_CODES
} = require('../config');
const {
    jwtPassportMiddleware
} = require('../auth/auth.strategy');
const {
    Set,
    SetJoiSchema
} = require('./sets.model');

//Create new set   
setsRouter.post('/', (req, res) => {
    const newSet = {
        date: req.body.date,
        exercise: req.body.exercise,
        reps: req.body.reps,
        weight: req.body.weight,
        set: req.body.set

    }
    const validation = Joi.validate(newSet, SetJoiSchema);
    if (validation.error) {
        console.log("Set Validation Error")
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: validation.error
        });
    }
    Set.create(newSet)
        .then(createdSet => {
            return res.status(HTTP_STATUS_CODES.CREATED).json(createdSet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
        })
})

setsRouter.get('/', (req, res) => {
    Set.find()
        .then(sets => {
            return res.status(HTTP_STATUS_CODES.OK).json(
                sets.map(set => set.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});
module.exports = {

    setsRouter
}