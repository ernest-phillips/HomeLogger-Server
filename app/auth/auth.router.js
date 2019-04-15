//Login endpoint to create users
const express = require("express");
//Create and issue json Web tokens
const jwt = require("jsonwebtoken");
// const path = require('path');
const {
  localPassportMiddleware,
  jwtPassportMiddleware
} = require("../auth/auth.strategy");
const { JWT_SECRET, JWT_EXPIRY } = require("../config.js");

const authRouter = express.Router();

function createJwtToken(user) {
  return jwt.sign(
    {
      user
    },
    JWT_SECRET,
    {
      subject: user.username,
      expiresIn: JWT_EXPIRY,
      algorithm: "HS256"
    }
  );
}
//Login endpoint
authRouter.get("/login", (req, res) => {
  const user = req.user.serialize();
  const jwtToken = createJwtToken(user);
  res.json({ jwtToken, user });
});

authRouter.post("/login", localPassportMiddleware, (request, response) => {
  const user = request.user.serialize();
  const jwtToken = createJwtToken(user);
  response.json({
    jwtToken,
    user
  });
});

// Receives JSON web token user can renew
authRouter.post("/refresh", jwtPassportMiddleware, (request, response) => {
  const user = request.user;
  const jwtToken = createJwtToken(user);
  response.json({
    jwtToken,
    user
  });
});

authRouter.post("/logout", (req, res) => {
  res.header(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  res.json({});
});
module.exports = {
  authRouter
};
