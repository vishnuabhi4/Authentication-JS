// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* imports the Schema constructor from the mongoose module and assigns it to the constant Schema. 
This constant can then be used to create new Mongoose schemas.*/
const uniqueValidator = require('mongoose-unique-validator');
/* const uniqueValidator = require('mongoose-unique-validator'); 
imports the mongoose-unique-validator module and assigns it to the constant uniqueValidator 

The mongoose-unique-validator module is a plugin for Mongoose that adds pre-save validation for 
unique fields within a Mongoose schema. This makes error handling much easier, since you will get 
a Mongoose validation error when you attempt to violate a unique constraint, rather than an E11000 error from MongoDB.
*/
let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
}, {
    collection: 'users'
})
userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
/*
The userSchema.plugin(uniqueValidator) method won’t let duplicate email id to be stored in the database.
The unique: true property in email schema does the internal optimization to enhance the performance.
*/
module.exports = mongoose.model('User', userSchema)