const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const {
    PORT,
    HTTP_STATUS_CODES,
    MONGO_URL,
    TEST_MONGO_URL
} = require('./config');
const {
    authRouter
} = require('./auth/auth.router');
const {
    userRouter
} = require('./user/user.router');
const {
    localStrategy,
    jwtStrategy
} = require('./auth/auth.strategy');

const {
    workoutRouter
} = require('./workout/workout.router');



let server;
const app = express(); //Initialize express server
passport.use(localStrategy);
passport.use(jwtStrategy);

//MIDLEWARE
app.use(morgan('combined')); //allows morgan to intercept and alog all http requests to console
app.use(express.json()); // Required so AJAX request JSON data payload can be parsed and saved into request.body
app.use(express.static('./public'));
app.use(express.urlencoded());

//ROUTER SETUP
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter); //Redirects all calls to /api/user to userRouter
app.use('/api/workout', workoutRouter);

app.use('*', function(req, res) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        error: 'Not Found.'
    });
});

module.exports = {
    app,
    startServer,
    stopServer
};

function startServer(testEnv) {
    return new Promise((resolve, reject) => {
        let mongoUrl;

        if (testEnv) {
            mongoUrl = TEST_MONGO_URL;
        } else {
            mongoUrl = MONGO_URL;
        }
        // Step 1: attempt to connect to MongoDB with mongoose
        mongoose.connect(mongoUrl, {
            useNewUrlParser: true
        }, err => {
            if (err) {
                // Step 2a: if there si an error starting mongo, log error, reject promise and stop code execution
                console.error(err);
                return reject(err);
            } else {
                // Step 2B: start express server
                server = app.listen(PORT, () => {
                    //STep 3A: log success message to console and resolve promise
                    console.log(`Express sever listining on http://localhost:${PORT}`);
                    resolve();
                }).on('error', err => {
                    // Step 3B: if there was a problem starting the express sever, disconnect from MongoDB immediately
                    mongoose.disconnect();
                    console.error(err);
                    reject(err);
                });
            }
        });
    });
}

function stopServer() {
    //Step 1: disconnect from MongoDB database using Mongoose
    return mongoose
        .disconnect()
        .then(() => new Promise((resolve, reject) => {
            //Step 2: Shut down the ExpressJS sever
            server.close(err => {
                if (err) {
                    //Step 3A: if an error occurred while shutting down, print out the error to the console and resolve promise
                    console.error(err);
                    return reject(err);
                } else {
                    //Step 3B: If server shutdown correctly, log success message.
                    console.log('Expres sever stopped');
                    resolve();
                }
            });
        }));
}