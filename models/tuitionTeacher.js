const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TuitionTeacherSchema = new Schema({
    firstName: {
        type: String,
        require: true,
    },
    middleName: {
        type: String,
        require: true,
    },
    // lastName: {
    //     type: String,
    //     require: true,
    // },
    // dateOfBirth: {
    //     type: Date,
    //     require: true,
    // },
    // gender: {
    //     type: String,
    //     require: true,
    // },
    // bloodGroup: {
    //     type: String,
    // },
    // maritalStatus: {
    //     type: String,
    // },
    // birthPlace: {
    //     type: String,
    // },
    // aadharno: {
    //     type: Number,
    // },
    // nationality: {
    //     type: String,
    // },
    // motherTongue: {
    //     type: String,
    // },
    position: {
        type: String,
    },
    yearOfExperience: {
        type: String,
    },  
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    subjects: [{

        title: {
            type: String,
            require: true,
        },
        subjectName: {
            type: String,
            require: true,
        },
        board: {
            type: String,
            require: true,
        },
        grade: {
            type: String,
            require: true,
        },
        stream: {
            type: String,
            require: true,
        },
        tuitionTime: {
            type: String,
            require: true,
        },
        // period: {
        //     type: String,
        //     require: true,
        // },
    }],
    // image_path: {
    //     type: String
    // },
    // image_binary: {
    //     type: String,

    // },
    // image_fieldName: {
    //     type: String,
    // },
    // image_original_filename: {
    //     type: String,
    // },
    // image_size: {
    //     type: String,
    // },
    // image_type: {
    //     type: String,
    // },
    // image_name: {
    //     type: String,
    // },
})
module.exports = mongoose.model('TuitionTeacher', TuitionTeacherSchema);;
