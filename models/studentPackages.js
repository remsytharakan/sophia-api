const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentPackagesSchema = new Schema({

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
    gradeId: {
        type: String,
        require: true
    },
    stream: {
        type: String,
        default: 'General'
    },

    packages: [{
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

module.exports = mongoose.model('StudentPackage', StudentPackagesSchema);