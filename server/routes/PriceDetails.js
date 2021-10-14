const PriceDetailsModel = require("../models/PriceDetailsModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getPriceDetailById = async (id) => {
    const priceDetail = await PriceDetailsModel.findById(id)
    return priceDetail;
}

const getPriceDetails = async () => {
    const priceDetails =  await PriceDetailsModel.find();
    return priceDetails;
}

const deletePriceDetail = async (id) => {
    const priceDetail = await PriceDetailsModel.deleteOne({_id: id})
    if(!priceDetail)
        throw BadRequestError;
}

module.exports = {
    getPriceDetails,
    getPriceDetailById,
    deletePriceDetail
}