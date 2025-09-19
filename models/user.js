const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');
// const autoIncrement = require('mongoose-auto-increment');

const UserSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        require: true
    },
    userType: {
        type: String,
        default: 'User',
        enum: ["User"]
    },
    defaultProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    profiles: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    password: {
        type: String,
        require: true
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        require: true,
    },
    jwtToken1: {
        type: String,
    },
    jwtToken2: {
        type: String,
    },
    flag: {
        type: Number,
        default: 1
    },
    schoolSubscription: {
        type: Boolean,
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },

});
autoIncrement.initialize(mongoose.connection);


UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});
// UserSchema.pre('save', function (next) {
//     const user = this;
//     console.log('this.isNew: ', this.update);
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });

//         });
//     } else {
//         return next();
//     }
// });

UserSchema.methods.generateHash = function (password, cb) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return cb(err);
            }
            return cb(null, hash);
        });

    });
};

UserSchema.methods.comparePassword = function (passw, password, cb) {
    bcrypt.compare(passw, password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

UserSchema.pre('findOneAndUpdate', function (next) {
    const user = this;
    if (this.update({ password: user._update.password })) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user._update.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user._update.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});



module.exports = mongoose.model('User', UserSchema);