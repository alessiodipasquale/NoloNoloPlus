const mongoose = require('mongoose');
var Schema = mongoose.Schema

const _PropertyModel = new mongoose.Schema({
    name: {type: String, required: true}, 
    value: {type: String, required: false}, 
    associatedItems: {
        type: [Schema.Types.ObjectId],
        ref: "Item"
    }
},  { collection: "Property"});

const PropertyModel = mongoose.model('Property', _PropertyModel);

module.exports = PropertyModel;
