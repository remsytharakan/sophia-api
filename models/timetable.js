const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeTableSchema = new Schema({
    schoolCode: {
        type: String,
        require: true,
    },
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

    month: {
        type: String,
        require: true
    },
    monthName: {
        type: String,
        require: true
    },
    week: {
        type: String,
        require: true
    },
    monday: [{
        
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    tuesday: [{

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    wednesday: [{

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    thursday: [{

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    friday: [{

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    saturday: [{

        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            require: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject',
            require: true,
        },
        topicId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic',
            require: true,
        },
        videoLinkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VideoLink',
            require: true,
        },
        title: {
            type: String,
            require: true
        },
        facultyName: {
            type: String,
            require: true
        },
        subjectName: {
            type: String,
            require: true
        },
        lessonName: {
            type: String,
            require: true
            
        },
        topicName: {
            type: String,
            require: true
        },
        videoLink: {
            type: String,
            require: true
        },
        videoName: {
            type: String,
            require: true
        },
        day: {
            type: String,
            require: true
        },
        dayValue: {
            type: String,
            require: true
        },
    
        date: {
            type: String,
            require: true
        },
        timeFrom: {
            type: String,
            require: true
        },
        timeFromPeriod: {
            type: String,
            require: true
        },
        timeTo: {
            type: String,
            require: true
        },
        timeToPeriod: {
            type: String,
            require: true
        },
        zoomLink: {
            type: String,
            require: true
        },
        zoomTimeFrom: {
            type: String,
            require: true
        },
        zoomTimeFromPeriod: {
            type: String,
            require: true
        },
        zoomTimeTo: {
            type: String,
            require: true
        },
        zoomTimeToPeriod: {
            type: String,
            require: true
        },
        hour: {
            type: String,
            require: true
        },
        active: {
            type: Boolean,
            require: true,
            default: true
        },
    }],
    
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    generatedOn: {
        type: Date,
        require: true
    },



});

module.exports = mongoose.model('TimeTable', TimeTableSchema);