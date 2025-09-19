const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({

    couponCode: {
        type: String,
        require: true
    },
    description: {
        type: String,
        //require: true
    },
    value: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true,
        default: true
    }

}, { timestamps: true });
module.exports = mongoose.model('Coupons', CouponSchema);