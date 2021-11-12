const PriceDetailsModel = require("../models/PriceDetailsModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getPriceDetail = async () => {
    const priceDetail = await PriceDetailsModel.findById("PriceDetail1")
    return priceDetail;
}

const editPriceDetail = async (object) => {
    const pd = await PriceDetailsModel.find();
    await PriceDetailsModel.updateOne({_id: pd[0]._id},object);
}

module.exports = {
    getPriceDetail,
    editPriceDetail
}