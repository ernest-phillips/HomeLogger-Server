//Login endpoint to create users
const express = require('express');
//Create and issue json Web tokens
const jwt = require('jsonwebtoken');

const {
    localPassportMiddleware,
    jwtPassportMiddleware
} = require('../auth/auth.strategy');
const {
    JWT_SECRET,
    JWT_EXPIRY
} = require('../config.js');

const authRouter = express.Router();

//Receives user we can turn into JSON web token to be issued out 
//to users to access protected endpoints
function createJwtToken(user) {
    return jwt.sign({
        user
    }, JWT_SECRET, {
        subject: user.username,
        expiresIn: JWT_EXPIRY,
        algorithm: 'HS256'
    });
}
//Login endpoint
authRouter.post('/login', (request, response) => {
    console.log("login started", request.body);

    const user = request.body.user.serialize();
    const jwtToken = createJwtToken(user);
    response.json({
        jwtToken,
        user
    });
});
//Receives JSON web token user can renew
authRouter.post('/refresh', jwtPassportMiddleware, (request, response) => {
    const user = request.user;
    const jwtToken = createJwtToken(user);
    response.json({
        jwtToken,
        user
    });
});

module.exports = {
    authRouter
};