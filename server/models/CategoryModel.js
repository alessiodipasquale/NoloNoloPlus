const mongoose = require('mongoose');
var Schema = mongoose.Schema

const _CategoryModel = new mongoose.Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    associatedItems: {
        type: [Schema.Types.ObjectId],
        ref: "Item"
    },
    associatedProperties: {
        type: [Schema.Types.ObjectId],
        ref: "Property"
    }
},  { collection: "Category"});

const CategoryModel = mongoose.model('Category', _CategoryModel);

module.exports = CategoryModel;

