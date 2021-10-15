const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _CategoryModel = new mongoose.Schema({
    _id: String,
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    associatedItems: {
        type: [String],
        ref: "Item"
    },
    associatedProperties: {
        type: [String],
        ref: "Property"
    }
},  { collection: "Category"});

_CategoryModel.pre('save', function (next) {
    const category = this;
    if (!category._id)
        category._id = uniqid('id-');
    next();
});

const CategoryModel = mongoose.model('Category', _CategoryModel);

module.exports = CategoryModel;

