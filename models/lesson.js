const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LessonSchema = new Schema({
    
    
    
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
    lessonName: {
        type: String,
        require: true,
    },
    lessonNumber: {
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

});
 module.exports = mongoose.model('Lesson',LessonSchema);
