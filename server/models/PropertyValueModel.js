const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema

const _PropertyValueModel = new mongoose.Schema({
    _id: String,
    associatedProperty: {
        type: String,
        ref: "Property"
    },
    value: {type: String, default: null},
    unitOfMeasure: {type: String, required: false}, 
    associatedItems: {
        type: [String],
        ref: "Item"
    }
},  { collection: "PropertyValue"});

_PropertyValueModel.pre('save', function (next) {
    const propertyVal = this;
    if (!propertyVal._id)
        propertyVal._id = uniqid('id-');
    next();
});