const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    
    categoryName: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    
    });
    module.exports = mongoose.model('Category',  CategorySchema);
