const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TotalScoreSchema = new Schema({
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
    testId: {
        type: String,
        require: true,
    },

    totalMark: {
        type: String,
        require: true
    },
    timeTaken: {
        type: String,
        require: true
    },
    generatedOn: {
        type: Date,
        require: true
    },
    isCompleted: {
        type: Boolean,
        require: true,
    },


});

module.exports = mongoose.model('TotalScoreSchema', TotalScoreSchema);