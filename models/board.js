const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    },
    board: {
        type: String,
        require: true
    },

    boardName: {
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

module.exports = mongoose.model('Board', BoardSchema);