import { HTTP_STATUS_CODES } from "../config";
const express = require("express");
const { User } = require("../models/user.model");

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
});

// retrieve all users

userRouter.get("/", (req, res) => {});
// module.exports = { routes };
