const PriceDetailsModel = require("../models/PriceDetailsModel");

const getPriceDetailById = async (req,res) => {
    try {
        const priceDetail = await PriceDetailsModel.findById(req.params.id)
        res.send(priceDetail);
    } catch (err) {
        res.handle(err);
    }
}

const getPriceDetails = async (req,res) => {
    try {
        const priceDetails =  await PriceDetailsModel.find();
        res.send(priceDetails);
    } catch (err) {
        res.handle(err);
    }
}

const deletePriceDetail = async (req,res) => {
    try {
        const priceDetail = await PriceDetailsModel.deleteOne({_id: req.params.id})
        res.send();
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getPriceDetails,
    getPriceDetailById,
    deletePriceDetail
}