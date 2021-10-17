const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema

const _PropertyModel = new mongoose.Schema({
    _id: String,
    name: {type: String, required: true},
    associatedValues:{
        type: [String],
        ref: "PropertyValue"
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
