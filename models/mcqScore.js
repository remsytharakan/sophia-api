const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MCQScoreSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    mcqId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MCQ',
        require: true,
    },

    questionId: {
        type: String,
        require: true
    },
    optionGiven: {
        type: String,
        require: true
    },
    correctOption: {
        type: String,
        require: true
    },
    mark: {
        type: String,
        require: true
    },
    timeTaken: {
        type: String,
        require: true
    },
    isCorrect: {
        type: Boolean,
        require: true,
    },
    generatedOn: {
        type: Date,
        require: true
    },
    


});

module.exports = mongoose.model('MCQScore', MCQScoreSchema);