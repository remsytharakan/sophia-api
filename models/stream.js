const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StreamSchema = new Schema({

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
    gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        require: true,
    },

    streamName: {
        type: String,
        require: true
    },
    generatedOn: {
        type: Date,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },


});

module.exports = mongoose.model('Stream', StreamSchema);