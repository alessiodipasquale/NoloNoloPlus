const CertificationModel = require("../models/CertificationModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')
const { associateToRental, associateToUser } = require('./associations/AssociationManager');
const RentalModel = require("../models/RentalModel");
const UserModel = require("../models/UserModel");

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
    if(!object.employerId)
        object.employerId = employerId
    const certification = await CertificationModel.create(object);
    if(object.certificationType == 'ritiro'){
        await associateToRental("single","state","in corso",object.rentalId)
        await associateToRental("single", "rentalCertification",certification._id, object.rentalId)
        await associateToRental("single", "employerId", employerId, object.rentalId)
        await associateToUser("array", "rentals", object.rentalId, object.employerId)
    }else{
        const rental = await RentalModel.findById(object.rentalId)
        const points = rental.finalPrice;
        const client = rental.clientId;
        await UserModel.updateOne({ _id: client }, { $set: { "loyaltyPoints": points } });
        await associateToRental("single","state","terminata",object.rentalId)
        await associateToRental("single", "returnCertification",certification._id, object.rentalId)
    }
    return certification;
}

const editCertification = async (certId, object) => {
    const certification = await getCertificationById(certId);
    let secureObject = JSON.stringify(certification);
    secureObject = JSON.parse(secureObject);
    
    if(object.certificationType)
        secureObject.certificationType = object.certificationType;
    if(object.certificationDate)
        secureObject.certificationDate = object.certificationDate;
    if(object.commentsFromEmployer)
        secureObject.commentsFromEmployer = object.commentsFromEmployer;
    //
    if(object.rentalId) {
        if(secureObject.rentalId != null)
            deleteAssociationToRental(secureObject.rentalId, rentalId)
        if(object.rentalId != "toDelete") {
            secureObject.rentalId = object.rentalId;
            associateToRental("single", secureObject.certificationType, certId, object.rentalId);
        }
    }
    if(object.employerId) {
        if(secureObject.employerId != null)
            deleteAssociationToUser(secureObject.employerId, rentalId)
        if(object.employerId != "toDelete") {
            secureObject.employerId = object.employerId;
            associateToUser("array", "certifications", certId, object.employerId);
        }
    }
    await CategoryModel.updateOne({_id: catId},secureObject);
    return null;
}

module.exports = {
    getCertifications,
    getCertificationById,
    createCertification,
    deleteCertification,
}