const mongoose =require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _PriceDetailsModel = new mongoose.Schema({
    _id: String,
    longUsageDiscountMultiplier: { type: Number, required: false},   //higher than a week
    fidelityPriceMultiplier: {type: Number, required: false},
    kitDiscount: {type: Number, required: false},
    favouritesTreshold: {type: Number, required:true},
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

