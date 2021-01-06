const mongoose = require("mongoose");

/// To hash the passwords...
const bcrypt = require('bcrypt');

/**
 * @author Aakash Jangid
 * @collection users
 * @fields email, password, display name
 * @bcrypt salty encryption of 10 on password
 */
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 5 },
    displayName: { type: String },
    employee: {
        type: mongoose.Schema.Types.ObjectId, ref: "Employee"
    }
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password'))
        return next();
    // salt or round! 
    // encryption of 10 --- as specified in docs

    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if (err) return next(err);
        this.password = passwordHash;
        next();
    });
});
/*
// for testing hashes
UserSchema.method.comparePassword = function (_, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);      //this => user object
        }
    })

}
*/
module.exports = User = mongoose.model('User', UserSchema);