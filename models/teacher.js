const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema

const TeacherSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        require: true,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        require: true,
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        require: true,
    },

    streamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream',
        require: true,
    },
    userType: {
        type: String,
        default: 'Teacher',
        enum: ["Teacher"]
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    dateOfBirth: {
        type: Date,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    bloodGroup: {
        type: String,
    },
    subject: {
        type: String,
    },
    class: {
        type: String,
    },
    maritalStatus: {
        type: String,
    },
    active: {
        type: Boolean,
        require: true,
        default: true,
    },
    image_path: {
        type: String
    },
    image_binary: {
        type: String,

    },
    image_fieldName: {
        type: String,
    },
    image_original_filename: {
        type: String,
    },
    image_size: {
        type: String,
    },
    image_type: {
        type: String,
    },
    image_name: {
        type: String,
    },
    birthPlace: {
        type: String,
    },
    aadharno: {
        type: Number,
    },
    nationality: {
        type: String,
    },
    motherTongue: {
        type: String,
    },
    position: {
        type: String,
    },
    yearOfExperience: {
        type: String,
    }   
})
autoIncrement.initialize(mongoose.connection);


TeacherSchema.plugin(autoIncrement.plugin, {
    model: 'Teacher',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});

// TeacherSchema.pre('save', function (next) {
//     const teacher = this;
//     // console.log('this.isNew: ', this.update);
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(teacher.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 teacher.password = hash;
//                 next();
//             });

//         });
//     } else {
//         return next();
//     }
// });
// TeacherSchema.methods.generateHash = function (password, cb) {
//     bcrypt.genSalt(10, function (err, salt) {
//         if (err) {
//             return next(err);
//         }
//         bcrypt.hash(password, salt, function (err, hash) {
//             if (err) {
//                 return cb(err);
//             }
//             return cb(null, hash);
//         });

//     });
// };

// TeacherSchema.methods.comparePassword = function (passw, password, cb) {
//     bcrypt.compare(passw, password, function (err, isMatch) {
//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

// TeacherSchema.pre('findOneAndUpdate', function (next) {
//     const teacher = this;
//     if (this.update({ password: teacher._update.password })) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(teacher._update.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 teacher._update.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });

module.exports = mongoose.model('Teacher', TeacherSchema);;