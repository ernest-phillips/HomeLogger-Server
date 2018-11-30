//Login endpoint to create users
const express = require('express');
//Create and issue json Web tokens
const jwt = require('jsonwebtoken');
const path = require('path');
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
authRouter.get('/login', (request, response) => {
    console.log("login started")
    response.sendFile(path.resolve('./app/views/auth/login.html'));
    // 
    // response.json({
    //     jwtToken,
    //     user

    // });
});
authRouter.post('/login', localPassportMiddleware, (request, response) => {
    const user = request.user.serialize();
    const jwtToken = createJwtToken(user);
    response.redirect('/api/workout');


});

authRouter.get('/api/user', jwtPassportMiddleware, (request, response) => {
    console.log("Signup page")
    const user = request.user.serialize();
    const jwtToken = createJwtToken(user);
    // response.sendFile(path.resolve('./app/views/auth/login.html'));
    // response.json({
    //     jwtToken,
    //     user

    // });
});
//Receives JSON web token user can renew
// authRouter.post('/refresh', jwtPassportMiddleware, (request, response) => {
//     const user = request.user;
//     const jwtToken = createJwtToken(user);
//     response.redirect('/api/workout');
//     // response.json({
//     //     jwtToken,
//     //     user
//     // });
// });

module.exports = {
    authRouter
};