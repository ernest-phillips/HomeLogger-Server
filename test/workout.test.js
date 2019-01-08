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

const expect = chai.expect;
chai.use(chaiHttp);

describe('Integration tests for: /api/home', function() {
    let testUser, jwtToken;

    before(function() {

        return startServer(true);
    });

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

    afterEach(function() {

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


    after(function() {

        return stopServer();
    });

    it('Should return user workouts', function() {
        return chai.request(app)
            .get('/api/home')
            .set('Authorization', `Bearer ${jwtToken}`)
            .then(res => {
                console.log("The body:",res.body[0].sets);
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf.at.least(1);
            
                const workout = res.body[0];
                console.log("User workout:", workout)
            
                expect(workout).to.include.keys('user','sets');
                expect(workout.sets).to.include.keys( 'exercise', 'set', 'reps')
                expect(workout.user).to.be.a('string');
                
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
                    .get(`/api/home/${foundWorkout.id}`)
                    .set('Authorization', `Bearer ${jwtToken}`);
            })
            .then(res => {
                
                expect(res).to.have.status(HTTP_STATUS_CODES.OK);
                expect(res).to.be.json;
                // expect(res.body).to.be.a('object');
                expect(res.body).to.include.keys('user','sets');
                expect(res.body.sets).to.include.keys('exercise', 'set', 'reps');

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
                    .delete(`/api/home/${workoutToDelete.id}`)
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

    function createFakerWorkout() {
        return  {sets:{exercise: faker.lorem.word(),set: faker.random.number(),reps: faker.random.number()}};
    }
});
