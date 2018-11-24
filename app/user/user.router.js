const express = require('express');

const Joi = require('joi');

const {
    HTTP_STATUS_CODES
} = require('../config.js');
const {
    User,
    UserJoiSchema
} = require('./user.model.js');

const userRouter = express.Router();

// CREATE NEW USER
userRouter.post('/', (request, response) => {
    console.log("User Added")
    const newUser = {
        name: request.body.name,
        email: request.body.email,
        username: request.body.username,
        password: request.body.password
    };

    // pass in user object and validate against UserJoiSchema
    const validation = Joi.validate(newUser, UserJoiSchema);
    if (validation.error) {
        // Step 2A: If validation error is found, end the the request with a server error and error message.
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            error: validation.error
        });
    }

    User.findOne({
        $or: [{
                email: newUser.email
            },
            {
                username: newUser.username
            }
        ]
    }).then(user => {
        if (user) {
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
                error: 'Database Error: A user with that username and/or email already exists.'
            });
        }
        return User.hashPassword(newUser.password);
    }).then(passwordHash => {
        newUser.password = passwordHash;

        User.create(newUser)
            .then(createdUser => {
                // return response.status(HTTP_STATUS_CODES.CREATED).json(createdUser.serialize());
                // console.log("The user has been created.")
                // return "The user has been created."
                return response.redirect('/api/workout');
            })
            .catch(error => {
                console.error(error);
                return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
                    error: error.message
                });
            });
    });
});

// RETRIEVE USERS
userRouter.get('/', (request, response) => {
    console.log("Retrieving All Users");
    User.find()
        .then(users => {
            // Step 2A: Return the correct HTTP status code, and the users correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(
                users.map(user => user.serialize())
            );
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});
// RETRIEVE ONE USER
userRouter.get('/:userid', (request, response) => {
    // Step 1: Attempt to retrieve a specific user using Mongoose.Model.findById()
    // https://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById(request.params.userid)
        .then(user => {
            // Step 2A: Return the correct HTTP status code, and the user correctly formatted via serialization.
            return response.status(HTTP_STATUS_CODES.OK).json(user.serialize());
        })
        .catch(error => {
            // Step 2B: If an error ocurred, return an error HTTP status code and the error in JSON format.
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = {
    userRouter
};