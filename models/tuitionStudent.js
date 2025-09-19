const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TuitionStudentSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    tuitionTeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tuition Teacher',
        require: true,
    },
    studentCode: {
        type: String,
        require: true,
    },
    subjectName: {
        type: String,
        require: true,
    },
    tuitionTeacherName: {
        type: String,
        require: true,
    },
    paymentStatus: {
        type: Boolean,
        require: true,
        default:false
    }
})
module.exports = mongoose.model('TuitionStudent', TuitionStudentSchema);;
