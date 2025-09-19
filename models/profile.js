const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const ProfileSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    code: {
        type: Number,
        unique: true,
        require: true,
    },
    student_code: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        require: true,
    },
    board: {
        type: String,
        require: true
    },
    reference: {
        type: String
    },
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        require: true,
    },
    grade: {
        type: String,
        require: true
    },
    streamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream',
        require: true,
    },
    stream: {
        type: String,
        default: 'General'
    },
    city: {
        type: String,
        require: true
    },
    school_code: {
        type: String,
    },
    reg_time: {
        type: Date,
        default: Date.now
    },
    process_fee_paid: {
        type: Boolean,
        default: false
    },
    packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
    }],

});


autoIncrement.initialize(mongoose.connection);


ProfileSchema.plugin(autoIncrement.plugin, {
    model: 'Profile',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});


ProfileSchema.pre('save', function (next) {
    this.student_code = this.code.toString();
    next();
});

module.exports = mongoose.model('Profile', ProfileSchema);