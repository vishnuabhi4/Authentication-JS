// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* imports the Schema constructor from the mongoose module and assigns it to the constant Schema. 
This constant can then be used to create new Mongoose schemas.*/
const uniqueValidator = require('mongoose-unique-validator');
/* const uniqueValidator = require('mongoose-unique-validator'); 
imports the mongoose-unique-validator module and assigns it to the constant uniqueValidator */
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
module.exports = mongoose.model('User', userSchema)