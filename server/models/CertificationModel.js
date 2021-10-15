const mongoose =require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _CertificationModel = new mongoose.Schema({
    _id: String,
    rentalId: {
        type: String,
        ref: 'Rental'
    },
    employerId: {
        type: String,
        ref: 'User'
    },
    certificationType:{
        type: String,
        enum: ['ritiro','riconsegna']
    },
    commentsFromEmployer: {type: String, required: false}
        
},  { collection: "Certification"});

_CertificationModel.pre('save', function (next) {
    const certification = this;
    if (!certification._id)
        certification._id = uniqid('id-');
    next();
});

const CertificationModel = mongoose.model('Certification', _CertificationModel);

module.exports = CertificationModel;