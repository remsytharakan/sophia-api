const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
        phoneNumber: {
                type: String,
                require: true
        },

        otp: {
                type: String,
                require: true
        },
        generatedOn: {
                type: Date,
                require: true
        },
        active: {
                type: Boolean,
                require: true
        },
        type: {
                type: String,
                require: true,
                enum: ['LOGIN', 'REGISTER']
        },
      
     
});

module.exports = mongoose.model('otp', OTPSchema);