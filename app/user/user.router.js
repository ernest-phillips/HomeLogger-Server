const express = require("express");
const Joi = require("joi");
const { HTTP_STATUS_CODES } = require("../config.js");
const { User, UserJoiSchema } = require("./user.model.js");

const userRouter = express.Router();

// CREATE NEW USER
userRouter.post("/register", (request, response) => {
  const newUser = {
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  };

  // pass in user object and validate against UserJoiSchema
  const validation = Joi.validate(newUser, UserJoiSchema);
  if (validation.error) {
    return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
      error: validation.error
    });
  }

  User.findOne({
    $or: [{ email: newUser.email }, { username: newUser.username }]
  })
    .then(user => {
      if (user) {
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
          error:
            "Database Error: A user with that username and/or email already exists."
        });
      }
      return User.hashPassword(newUser.password);
    })
    .then(passwordHash => {
      newUser.password = passwordHash;

      User.create(newUser)
        .then(createdUser => {
          return response
            .status(HTTP_STATUS_CODES.CREATED)
            .json(createdUser.serialize());
        })

        .catch(error => {
          console.error(error);
          return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            error: error.message
          });
        });
    });
});

// RETRIEVE USERS using api.users
userRouter.get("/", (request, response) => {
  User.find()
    .then(users => {
      return response
        .status(HTTP_STATUS_CODES.OK)
        .json(users.map(user => user.serialize()));
    })
    .catch(error => {
      return response
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .send(error);
    });
});
// RETRIEVE ONE USER
userRouter.get("/:userid", (request, response) => {
  User.findById(request.params.userid)
    .then(user => {
      return response.status(HTTP_STATUS_CODES.OK).json(user.serialize());
    })
    .catch(error => {
      return response
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json(error);
    });
});

module.exports = {
  userRouter
};
