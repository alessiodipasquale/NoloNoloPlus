const CertificationModel = require("../models/CertificationModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


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

module.exports = {
    getCertifications,
    getCertificationById,
    deleteCertification
}