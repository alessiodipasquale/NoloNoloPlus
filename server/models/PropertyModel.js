const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema

const _PropertyModel = new mongoose.Schema({
    _id: String,
    name: {type: String, required: true}, 
    value: {type: String, required: false},
    unitOfMeasure: {type: String, required: false}, 
    associatedItems: {
        type: [String],
        ref: "Item"
    }
},  { collection: "Property"});

_PropertyModel.pre('save', function (next) {
    const property = this;
    if (!property._id)
        property._id = uniqid('id-');
    next();
});

const PropertyModel = mongoose.model('Property', _PropertyModel);

module.exports = PropertyModel;
