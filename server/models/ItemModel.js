const mongoose = require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _ItemModel = new mongoose.Schema({
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
    imgSrc: {type: String, default: "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png"},
    state: {
        type: String,
        enum : ['nuovo','ottimo','buono','usurato','molto usurato','inutilizzabile'],
        required: true
    },
    everBeenRented: {type: Boolean, default:false},
    rentalDates: {type: [Date], required: true},
    available: {type: Boolean, default: true},
    rentCount: {type: Number, default: 0},
    kitIds: {
        type: [String],
        ref: 'Kit'
    },
    properties:{
        type: [String],
        ref: 'Property'
    },
    reviews: {
        type: [String],
        ref: 'Review',
        default: []
    }

},  { collection: "Item"});

_ItemModel.pre('save', function (next) {
    const item = this;
    if (!item._id)
        item._id = uniqid('id-');
    next();
});

const ItemModel = mongoose.model('Item', _ItemModel);

module.exports = ItemModel;