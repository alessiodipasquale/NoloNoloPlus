const mongoose = require('mongoose');
var Schema = mongoose.Schema

const _ItemModel = new mongoose.Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    standardPrice: { type: Number, required: true},
    category: {
        type: String,
        enum : ['cat1','cat2'],
        required: true
    },
    priceDetailsId: {
        type: Schema.Types.ObjectId,
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
    rentCount: {type: Number, default: 0}
},  { collection: "Item"});

const ItemModel = mongoose.model('Item', _ItemModel);

module.exports = ItemModel;

