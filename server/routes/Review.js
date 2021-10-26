const ReviewModel = require("../models/ReviewModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');

const getReviewById = async (id) => {
    const review = await ReviewModel.findById(id)
    return review;
}

const getReviews = async () => {
    const reviews =  await ReviewModel.find();
    return reviews;
}

const deleteReview = async () => {
    const review = await ReviewModel.deleteOne({_id: id})
    if(!review)
        throw BadRequestError;
}

const createReview = async (object, userId) => {
    if(!object.start || !object.itemId)
        throw BadRequestError;
    object.clientId = userId;
    const review = await RentalModel.create(object);
    // TODO: add id to item and user
    return review;
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    deleteReview,
}