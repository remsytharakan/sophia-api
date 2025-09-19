const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({

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
    name: {
        type: String,
        require: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        require: true,
    },

    subjectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true,
    },
    videoLinkId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VideoLink',
        require: true,
    },
    chatMessage: {
        type: String,
        require: true
    },
    reply: [{
        type: String,
        require: true
    }],
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

module.exports = mongoose.model('Chat', ChatSchema);