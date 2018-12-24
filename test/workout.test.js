const mongoose = require('mongoose');
// https://www.npmjs.com/package/chai
const chai = require('chai');
// http://www.chaijs.com/plugins/chai-http/
const chaiHttp = require('chai-http');
const jsonwebtoken = require('jsonwebtoken');
const faker = require('faker');

const {
    HTTP_STATUS_CODES,
    JWT_SECRET,
    JWT_EXPIRY
} = require('../app/config');
const {
    startServer,
    stopServer,
    app
} = require('../app/server.js');
const {
    User
} = require('../app/user/user.model');
const {
    Workout
} = require('../app/workout/workout.model');

const expect = chai.expect; // So we can do "expect" instead of always typing "chai.expect"
chai.use(chaiHttp); // implements chai http plugin

describe('Integration tests for: /api/workout', function() {
    let testUser, jwtToken;

    // Mocha Hook: Runs before ALL the "it" test blocks.
    before(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.

        // Starts our Express Server, so we can test it.
        return startServer(true);
    });

    // Mocha Hook: Runs before EACH "it" test block.
    beforeEach(function() {
        testUser = createFakerUser();

        return User.hashPassword(testUser.password)
            .then(hashedPassword => {
                // Create a randomized test user.
                return User.create({
                    name: testUser.name,
                    email: testUser.email,
                    username: testUser.username,
                    password: hashedPassword
                }).catch(err => {
                    console.error(err);
                    throw new Error(err);
                });
            })
            .then(createdUser => {
                testUser.id = createdUser.id;

                jwtToken = jsonwebtoken.sign({
                        user: {
                            id: testUser.id,
                            name: testUser.name,
                            email: testUser.email,
                            username: testUser.username
                        }
                    },
                    JWT_SECRET, {
                        algorithm: 'HS256',
                        expiresIn: JWT_EXPIRY,
                        subject: testUser.username
                    }
                );

                const seedData = [];
                for (let i = 1; i <= 10; i++) {
                    const newWorkout = createFakerWorkout();
                    newWorkout.user = createdUser.id;
                    seedData.push(newWorkout);
                }
                return Workout.insertMany(seedData)
                    .catch(err => {
                        console.error(err);
                        throw new Error(err);
                    });
            });
    });

    // Mocha Hook: Runs after EACH "it" test block.
    afterEach(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.
        return new Promise((resolve, reject) => {
            // Deletes the entire database.
            mongoose.connection.dropDatabase()
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        });
    });

    // Mocha Hook: Runs after ALL the "it" test blocks.
    after(function() {
        // Be sure to always return a promise to Mocha when doing asynchronous work,
        // Otherwise Mocha will just asume your work is done even if it isn't.

        // Shuts down our Express Server, since we don't need it anymore.
        return stopServer();
    });

    it('Should return user workouts', function() {
        return chai.request(app)
            .get('/api/workout')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                const workout = res.body[0];
                expect(workout).to.include.keys('user', 'exercise', 'set');
                expect(workout.user).to.be.a('object');
                expect(workout.user).to.include.keys('name', 'email', 'username');
                expect(workout.user).to.deep.include({
                    id: testUser.id,
                    username: testUser.username,
                    email: testUser.email,
                    name: testUser.name
                });
            });
    });

    it('Should return a specific workout', function() {
        let foundWorkout;
        return Workout.find()
            .then(workouts => {
                expect(workouts).to.be.a('array');
                expect(workouts).to.have.lengthOf.at.least(1);
                foundWorkout = workouts[0];

                return chai.request(app)
                    .get(`/api/workout/${foundWorkout.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('user', 'title', 'content');
                expect(res.body).to.deep.include({
                    id: foundWorkout.id,
                    exercise: foundWorkout.exercise

                });
            });
    });

    it('Should update a specific workout', function() {
        let workoutToUpdate;
        const newWorkoutData = createFakerWorkout();
        return Workout.find()
            .then(workouts => {
                expect(workouts).to.be.a('array');
                expect(workouts).to.have.lengthOf.at.least(1);
                workoutToUpdate = workouts[0];

                return chai.request(app)
                    .put(`/api/workout/${workoutToUpdate.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send(newWorkoutData);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Workout.findById(workoutToUpdate.id);
            })
            .then(workout => {
                expect(workout).to.be.a('object');
                expect(workout).to.deep.include({
                    id: workoutToUpdate.id,
                    exercise: newWorkoutData.title,
                });
            });
    });

    it('Should delete a specific workout', function() {
        let workoutToDelete;
        return Workout.find()
            .then(workouts => {
                expect(workouts).to.be.a('array');
                expect(workouts).to.have.lengthOf.at.least(1);
                workoutToDelete = workouts[0];

                return chai.request(app)
                    .delete(`/api/workout/${workoutToDelete.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                expect(res).to.have.status(HTTP_STATUS_CODES.NO_CONTENT);

                return Workout.findById(workoutToDelete.id);
            })
            .then(workout => {
                expect(workout).to.not.exist;
            });
    });

    function createFakerUser() {
        return {
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            username: `${faker.lorem.word()}${faker.random.number(100)}`,
            password: faker.internet.password(),
            email: faker.internet.email()
        };
    }

    function createFakerworkout() {
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraphs()
        };
    }
});