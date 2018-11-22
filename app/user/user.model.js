//Connects to mongoDB
const mongoose = require('mongoose');
//Validates data
const Joi = require('joi');
//Encrypts passwords
const bcrypt = require('bcryptjs');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

//Is this globablly accessible?
userSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.name,
        email: this.email,
        username: this.username,
    };
};


userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};


userSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};


const UserJoiSchema = Joi.object().keys({

    name: Joi.string().min(1).trim().required(),
    username: Joi.string().alphanum().min(4).max(30).trim().required(),
    password: Joi.string().min(8).max(30).trim().required(),
    email: Joi.string().email().trim().required()
});


const User = mongoose.model('user', userSchema);
module.exports = { User, UserJoiSchema };