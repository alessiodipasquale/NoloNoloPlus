const mongoose =require('mongoose');

const ItemModel = new mongoose.Schema({
    name: {type: String, required: true}, 
    description: {type: String, required: true}, 
    price: {type: Number},
    state: {
        type: String,
        enum : ['nuovo','ottimo','buono','usato','usurato','inutilizzabile'],
        required: true
    },
    available: {type: Boolean, default: true},
    rentCount: {type: Number, default: 0}
},  { collection: "Item"});

const Item = mongoose.model('Item', ItemModel);

module.exports = Item;

