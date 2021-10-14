const CertificationModel = require("../models/CertificationModel");

const getCertificationById = async (req,res) => {
    try {
        const cert = await CertificationModel.findById(req.params.id)
        res.send(cert);
    } catch (err) {
        res.handle(err);
    }
}

const getCertifications = async (req,res) => {
    try {
        const certifications =  await CertificationModel.find();
        res.send(certifications);
    } catch (err) {
        res.handle(err);
    }
}

const deleteCertification = async (req,res) => {
    try {
        const certification = await CertificationModel.deleteOne({_id: req.params.id})
        res.send();
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getCertifications,
    getCertificationById,
    deleteCertification
}