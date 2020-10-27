const { HTTP_STATUS_CODES } = require("../config");
const express = require("express");
const { User } = require("../models/user.model");
const Joi = require("joi");

const userRouter = express.Router();

//create user
userRouter.post("/", (req, res) => {
  const newUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    homes: req.body.homes,
  };
  //   const validation = Joi.validate(newUser, UserJoiSchema);
  //   if (validation.error) {
  //     return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
  //       error: validation.error,
  //     });
  //   }
  User.findOne({
    $or: [
      {
        email: newUser.email,
      },
      {
        username: newUser.username,
      },
    ],
  }).then((user) => {
    if (user) {
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        error:
          "Database Error: A user with that username and/or email already exists.",
      });
    }
    //   return User.hashPassword(newUser.password);
  });
  // .then((passwordHash) => {
  //   newUser.password = passwordHash;

  //   User.create(newUser)
  //     .then((createdUser) => {
  //       return response
  //         .status(HTTP_STATUS_CODES.CREATED)
  //         .json(createdUser.serialize());
  //     })

  //     .catch((error) => {
  //       console.error(error);
  //       return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
  //         error: error.message,
  //       });
  //     });
  // });
});

// retrieve all users

userRouter.get("/", (req, res) => {
  User.find()
    .then((users) => {
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json(users.map((user) => user.serialize()));
    })
    .catch((error) => {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error);
    });
});
module.exports = { userRouter };
