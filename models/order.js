const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const autoIncrement = require('mongoose-auto-increment');

const OrderSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    profile_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        require: true,
    },
    code: {
        type: Number,
        unique: true,
        require: true,
    },
    orderId: {
        type: String,
        require: true,
    },
    amount: {
        type: Number,
        require: true
    },
    packageId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        require: true,
    }],

    generatedOn: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        default: "Processing",
        enum: ["Waiting for payment", "Order Accepted", "Processing", "Successful", "Failed", "Delivered", "Cancelled",]
    }

});


autoIncrement.initialize(mongoose.connection);


OrderSchema.plugin(autoIncrement.plugin, {
    model: 'Order',
    field: 'code',
    startAt: 10000,
    incrementBy: 1
});


OrderSchema.pre('save', function (next) {
    this.orderId = this.code.toString();
    next();
});

module.exports = mongoose.model('Order', OrderSchema);