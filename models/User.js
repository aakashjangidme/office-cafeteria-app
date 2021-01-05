const mongoose = require("mongoose");

/// To hash the passwords...
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 6,
        max: 15,
    }
    ,
    password: {
        type: String,
        required: true,
        min: 6,
        max: 15,

    },
    role: {
        type: String,
        required: false,
        enum: ["user", "admin"]
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Employee"
    }]

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

// for testing hashes
UserSchema.method.comparePassword = function (params, cb) {
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
module.exports = mongoose.model('User', UserSchema);