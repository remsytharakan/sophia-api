const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema

const SchoolAdminSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        require: true,
    },
   
    userType: {
        type: String,
        default: 'SchoolAdmin',
        enum: ["SchoolAdmin"]
    },
    password: {
        type: String,
        require: true
    },
    schoolName: {
        type: String,
        unique: true,
        require: true,
    },
    schoolAddress: {
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


SchoolAdminSchema.plugin(autoIncrement.plugin, {
    model: 'SchoolAdmin',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});
SchoolAdminSchema.pre('save', function (next) {
    const schoolAdmin = this;
    // console.log('this.isNew: ', this.update);
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(schoolAdmin.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                schoolAdmin.password = hash;
                next();
            });

        });
    } else {
        return next();
    }
});
SchoolAdminSchema.methods.generateHash = function (password, cb) {
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

SchoolAdminSchema.methods.comparePassword = function (passw, password, cb) {
    bcrypt.compare(passw, password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

SchoolAdminSchema.pre('findOneAndUpdate', function (next) {
    const schoolAdmin = this;
    if (this.update({ password: schoolAdmin._update.password })) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(schoolAdmin._update.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                schoolAdmin._update.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

module.exports = mongoose.model('SchoolAdmin', SchoolAdminSchema);;