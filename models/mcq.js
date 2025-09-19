const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MCQSchema = new Schema({

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
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        require: true,
    },
    totalMarks: {
        type: Number,
    },

    title: {
        type: String,
        require: true
    },

    time: {
        type: Number
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    questions: [
        {
            mark: {
                type: Number,
            },
            question: {
                type: String,
                require: true
            },
            option1: {
                type: String,
                require: true
            },
            option2: {
                type: String,
                require: true
            },
            option3: {
                type: String,
                require: true
            },
            option4: {
                type: String,
                require: true
            },
            correctOption: {
                type: String,
                require: true
            },
            explanation: {
                type: String,
                // require: true
            }
        }
    ],
});

module.exports = mongoose.model('MCQ', MCQSchema);;