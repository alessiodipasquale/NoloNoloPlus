const mongoose =require('mongoose');
const uniqid = require('uniqid');
var Schema = mongoose.Schema;

const _CertificationModel = new mongoose.Schema({
    _id: String,
    rentalId: {
        type: String,
        required: true,
        ref: 'Rental'
    },
    employeeId: {
        type: String,
        required: true,
        ref: 'User'
    },
    certificationType:{
        type: String,
        required: true,
        enum: ['ritiro','riconsegna']
    },
    certificationDate: {type: Date, default: new Date()},
    commentsFromEmployee: {type: String, required: false}
    
},  { collection: "Certification"});

_CertificationModel.pre('save', function (next) {
    const certification = this;
    if (!certification._id)
        certification._id = uniqid('id-');
    next();
});

const CertificationModel = mongoose.model('Certification', _CertificationModel);

module.exports = CertificationModel;