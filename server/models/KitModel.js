const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _KitModel = new mongoose.Schema({
    _id: String,
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    standardPrice: { type: Number, required: true},
    category: {
        type: [String],
        required: true,
        ref: 'Category'
    },
    priceDetailsId: {
        type: String,
        required: true,
        ref: 'PriceDetails'
    },
    available: {type: Boolean, default: true},
    items: {
        type: [String],
        ref: 'Item'
    },
},  { collection: "Kit"});

_KitModel.pre('save', function (next) {
    const kit = this;
    if (!kit._id)
        kit._id = uniqid('id-');
    next();
});

const KitModel = mongoose.model('Kit', _KitModel);

module.exports = KitModel;