const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubjectSchema = new Schema({

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

    streamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stream',
        require: true,
    },
    streamName: {
        type: String,
        require: true,
    },
    subjectName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    color: {
        type: String,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    image_path: {
        type: String
    },
    image_binary: {
        type: String,

    },
    image_fieldName: {
        type: String
    },
    image_original_filename: {
        type: String
    },
    image_size: {
        type: String
    },
    image_type: {
        type: String
    },
    image_name: {
        type: String
    },

});

module.exports = mongoose.model('Subject', SubjectSchema);
