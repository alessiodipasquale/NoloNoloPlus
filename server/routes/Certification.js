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

const createCertification = async (object, employeeId) => {
    if(!object.rentalId || !object.certificationType)
        throw BadRequestError;
    if(!object.employeeId)
        object.employeeId = employeeId
    const certification = await CertificationModel.create(object);
    if(object.certificationType == 'ritiro'){
        await associateToRental("single","state","in corso",object.rentalId)
        await associateToRental("single", "rentalCertification",certification._id, object.rentalId)
        await associateToRental("single", "employeeId", employeeId, object.rentalId)
        await associateToUser("array", "rentals", object.rentalId, object.employeeId)
    }else{
        const rental = await RentalModel.findById(object.rentalId)
        const points = rental.finalPrice;
        const client = rental.clientId;
        await associateToUser("single", "loyaltyPoints", points, client)
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
    if(object.commentsFromEmployee)
        secureObject.commentsFromEmployee = object.commentsFromEmployee;
    //
    if(object.rentalId) {
        if(secureObject.rentalId != null)
            deleteAssociationToRental(secureObject.rentalId, rentalId)
        if(object.rentalId != "toDelete") {
            secureObject.rentalId = object.rentalId;
            associateToRental("single", secureObject.certificationType, certId, object.rentalId);
        }
    }
    if(object.employeeId) {
        if(secureObject.employeeId != null)
            deleteAssociationToUser(secureObject.employeeId, rentalId)
        if(object.employeeId != "toDelete") {
            secureObject.employeeId = object.employeeId;
            associateToUser("array", "certifications", certId, object.employeeId);
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