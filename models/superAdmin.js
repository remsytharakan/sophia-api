const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema

const SuperAdminSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        require: true,
    },
   
    userType: {
        type: String,
        default: 'SuperAdmin',
        enum: ["SuperAdmin", "Admin"]
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        require: true
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        require: true,
        default: true,
    }
})
autoIncrement.initialize(mongoose.connection);


SuperAdminSchema.plugin(autoIncrement.plugin, {
    model: 'SuperAdmin',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});
SuperAdminSchema.pre('save', function (next) {
    const superAdmin = this;
    // console.log('this.isNew: ', this.update);
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(superAdmin.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                superAdmin.password = hash;
                next();
            });

        });
    } else {
        return next();
    }
});
SuperAdminSchema.methods.generateHash = function (password, cb) {
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

SuperAdminSchema.methods.comparePassword = function (passw, password, cb) {
    bcrypt.compare(passw, password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

SuperAdminSchema.pre('findOneAndUpdate', function (next) {
    const superAdmin = this;
    if (this.update({ password: superAdmin._update.password })) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(superAdmin._update.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                superAdmin._update.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

module.exports = mongoose.model('SuperAdmin', SuperAdminSchema);;