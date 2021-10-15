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

const createPriceDetail = async (object) => {
    //if(!object.name || !object.description)
    //    throw BadRequestError;

    const priceDetail = await PriceDetailsModel.create(object);
    return priceDetail;
}

module.exports = {
    getPriceDetails,
    getPriceDetailById,
    deletePriceDetail,
    createPriceDetail
}