const PriceDetailsModel = require("../models/PriceDetailsModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getPriceDetail = async () => {
    const priceDetail = await PriceDetailsModel.findById("PriceDetail1")
    return priceDetail;
}

module.exports = {
    getPriceDetail,
}