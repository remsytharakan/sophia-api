const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageCategorySchema = new Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    packageCategoryName: {
        type: String,
        require: true
    },
    generatedOn: {
        type: Date,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    }
});

module.exports = mongoose.model('PackageCategory', PackageCategorySchema);