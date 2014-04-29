/**
 * Our Schema for Users
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// Define the User Schema
var userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {} // for extra information you may / may not want
});

// A method that's called everytime a user document is saved..
userSchema.pre('save', function (next) {
    
    var user = this;
    
    // If the password hasn't been modified, move along...
    if (!user.isModified('password')) {
        return next();
    }

    // generate salt
    bcrypt.genSalt(10, function(err, salt){

        if(err){
            return next(err);
        }

        // create the hash and store it
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// Password verification helper
userSchema.methods.comparePassword = function (triedPassword, cb) {
    bcrypt.compare(triedPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

// The primary user model
var User = mongoose.model('User', userSchema);

module.exports = User;