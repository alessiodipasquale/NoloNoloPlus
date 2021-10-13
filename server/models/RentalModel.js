const mongoose =require('mongoose');
var Schema = mongoose.Schema;

const _RentalModel = new mongoose.Schema({
    startDate: {type: Date, required:true},
    endDate: {type: Date, required:true},
    /*ricevuta...?*/
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timeInMinutes: {type: Number, required:true},
    rentalType:{
        type: String,
        enum: ['prenotazione','istantaneo']
    },
    /*ripetizione noleggio..?*/
    rentalCertification:{
        type: Schema.Types.ObjectId,
        ref: 'Certification'
    },
    returnCertification:{
        type: Schema.Types.ObjectId,
        ref: 'Certification'
    }

},  { collection: "Rental"});

const RentalModel = mongoose.model('Rental', _RentalModel);

module.exports = RentalModel;