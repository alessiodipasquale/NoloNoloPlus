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
        required: true,
        ref: 'User'
    },
    timeInDays: {type: Number, required:true},
    rentalType:{
        type: String,
        required: true,
        enum: ['prenotazione','istantaneo']
    },
    /*ripetizione noleggio..?*/
    rentalCertification:{
        type: String,
        ref: 'Certification'
    },
    returnCertification:{
        type: String,
        ref: 'Certification'
    }

},  { collection: "Rental"});

_RentalModel.pre('save', function (next) {
    const rental = this;
    if (!rental._id)
        rental._id = uniqid('id-');
    next();
});

const RentalModel = mongoose.model('Rental', _RentalModel);

module.exports = RentalModel;