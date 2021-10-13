const mongoose =require('mongoose');
var Schema = mongoose.Schema;

const _PriceDetailsModel = new mongoose.Schema({
    itemsId: {
        type: [Schema.Types.ObjectId],
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

const PriceDetailsModel = mongoose.model('PriceDetails', _PriceDetailsModel);

module.exports = PriceDetailsModel;

