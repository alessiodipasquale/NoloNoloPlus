const ReviewModel = require("../models/ReviewModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToUser } = require("./User");
const { associateToItem } = require("./Item");

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
    if(!object.stars || !object.itemId)
        throw BadRequestError;
    object.clientId = userId;
    const review = await ReviewModel.create(object);
    await associateToUser("array","reviews",review._id,userId);
    await associateToItem("array","reviews",review._id,object.itemId);
    return review;
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    deleteReview,
}