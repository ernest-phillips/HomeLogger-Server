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
const {
    exerciseRouter
} = require('./exercise/exercise.router')


let server;
const app = express(); //Initialize express server
passport.use(localStrategy);
passport.use(jwtStrategy);

//MIDLEWARE
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

//ROUTER SETUP
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/home', workoutRouter);
app.use('/api/exercises', exerciseRouter);
app.use(express.static('./public', {
    extensions: ['html', 'htm']
        // Other options here
}));


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
        mongoose.connect(mongoUrl, { useNewUrlParser: true },
            err => {
                if (err) {
                    console.error(err);
                    return reject(err);
                } else {
                    server = app.listen(PORT, () => {
                        console.log(`Express sever listining on http://localhost:${PORT}`);
                        resolve();
                    }).on('error', err => {
                        mongoose.disconnect();
                        console.error(err);
                        reject(err);
                    });
                }
            });
    });
}

function stopServer() {
    return mongoose
        .disconnect()
        .then(() => new Promise((resolve, reject) => {
            server.close(err => {
                if (err) {
                    console.error(err);
                    return reject(err);
                } else {
                    console.log('Express sever stopped');
                    resolve();
                }
            });
        }));
}