const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true,
    },
    packageCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PackageCategory',
        require: true
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
        require: true,
    },

    subjects: [{
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },

        lessons: [{
            lessonId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson',
                require: true,
            },
            topicIds: [{
                type: String
            }]
        }]
    }],

    packageName: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        require: true,
    },
    generatedOn: {
        type: Date,
        require: true,
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = mongoose.model('Package', PackageSchema);