const mongoose =require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _PriceDetailsModel = new mongoose.Schema({
    _id: String,
    itemsId: {
        type: [String],
        ref: 'Item'
    },
    longUsageDiscountMultiplier: { type: Number, required: false},
    fidelityPriceMultiplier: {type: Number, required: false},
    new_state: {type: Number, required: false}, 
    verygood_state: {type: Number, required: false}, 
    good_state: {type: Number, required: false}, 
    worn_state: {type: Number, required: false}, 
    veryworn_state: {type: Number, required: false}, 
    unusable_state: {type: Number, required: false},
},  { collection: "PriceDetails"});

_PriceDetailsModel.pre('save', function (next) {
    const pd = this;
    if (!pd._id)
        pd._id = uniqid('id-');
    next();
});

const PriceDetailsModel = mongoose.model('PriceDetails', _PriceDetailsModel);

module.exports = PriceDetailsModel;

