const mongoose =require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _RentalModel = new mongoose.Schema({
    _id: String,
    startDate: {type: Date, required:true},
    endDate: {type: Date, required:true},

    clientId: {
        type: String,
        required: true,
        ref: 'User'
    },
    employerId: {
        type: String,
        ref: 'User'
    },
    itemId: {               //
        type: [String],
        required: true,
        ref: 'Item'
    },
    kitId: {
        type: String,
        ref: 'Kit'
    },
    timeInDays: {type: Number, required:true},
    rentalType:{
        type: String,
        required: true,
        enum: ['prenotazione','istantaneo']
    },
    rentalTarget:{
        type: String,
        required: true,
        enum: ['singolo','kit'],
        default: 'singolo'
    },
    rentalCertification:{
        type: String,
        ref: 'Certification'
    },
    returnCertification:{
        type: String,
        ref: 'Certification'
    },
    state: {
        type: String,
        enum: ['in corso', 'terminata', 'futura', 'non completabile'],
        required: true
    },
    finalPrice: {
        type: Number,
        required:true
    },
    receipt: {
        type: [String],
        required:true,
        default: []
    },
    partialPrices: {
        type: [[String]],
        required: false
    },
    notes: {
        type: [String],
        required: false
    },
    damagedSomething: {type: Boolean, required: false},
},  { collection: "Rental"});

_RentalModel.pre('save', function (next) {
    const rental = this;
    if (!rental._id)
        rental._id = uniqid('id-');
    next();
});

const RentalModel = mongoose.model('Rental', _RentalModel);

module.exports = RentalModel;