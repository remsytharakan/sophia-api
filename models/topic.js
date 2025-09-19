const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TopicSchema = new Schema({

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

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
        require: true,
    },
    topicName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Topic', TopicSchema);
