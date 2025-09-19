const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoLinkSchema = new Schema({
    
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
    videoName: {
        type: String,
        require: true
    },
    videoLink: {
        type:String,
        require: true
    },
    videoType:{
        type:String,
        require: true
    },
    description:{
        type:String,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    
    
});
 module.exports = mongoose.model('VideoLink',VideoLinkSchema);
