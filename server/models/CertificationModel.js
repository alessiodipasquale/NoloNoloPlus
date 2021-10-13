const mongoose =require('mongoose');
var Schema = mongoose.Schema;

const _CertificationModel = new mongoose.Schema({
    rentalId: {
        type: Schema.Types.ObjectId,
        ref: 'Rental'
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    certificationType:{
        type: String,
        enum: ['ritiro','riconsegna']
    },
    commentsFromEmployer: {type: String, required: false}
        
},  { collection: "Certification"});

const CertificationModel = mongoose.model('Certification', _CertificationModel);

module.exports = CertificationModel;