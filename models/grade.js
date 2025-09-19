const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GradeSchema = new Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
        require: true,
    },
    grade: {
        type: String,
        require: true
    },

    gradeName: {
        type: String,
        require: true
    },
    isStream: {
        type: Boolean,
        require: true,
        default: false
    },
    generatedOn: {
        type: Date,
        require: true
    },
    isStream: {
        type: Boolean,
        require: true
        //default: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },


});

module.exports = mongoose.model('Grade', GradeSchema);