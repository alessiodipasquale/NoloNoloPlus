const CertificationModel = require("../models/CertificationModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')
const { associateToRental } = require('./Rental')

const getCertificationById = async (id) => {
    const cert = await CertificationModel.findById(id)
    return cert;
}

const getCertifications = async () => {
    const certifications =  await CertificationModel.find();
    return certifications;
}

const deleteCertification = async (id) => {
    const certification = await CertificationModel.deleteOne({_id: id})
    if(!certification)
        throw BadRequestError;
}

const createCertification = async (object, employerId) => {
    if(!object.rentalId || !object.certificationType)
        throw BadRequestError;

    object.employerId = employerId
    const certification = await CertificationModel.create(object);
    if(object.certificationType == 'ritiro'){
        await associateToRental("single", "rentalCertification",certification._id, object.rentalId)
        await associateToRental("single", "",employerId, object.rentalId)
    }else{
        await associateToRental("single", "returnCertification",certification._id, object.rentalId)
    }
    return certification;
}

module.exports = {
    getCertifications,
    getCertificationById,
    createCertification,
    deleteCertification
}