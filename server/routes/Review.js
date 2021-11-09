const ReviewModel = require("../models/ReviewModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToUser } = require("./associations/AssociationManager");
const { associateToItem } = require("./associations/AssociationManager");

const getReviewById = async (id) => {
    const review = await ReviewModel.findById(id)
    return review;
}

const getReviews = async () => {
    const reviews =  await ReviewModel.find();
    return reviews;
}

const deleteReview = async (id) => {
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

const editReview = async (revId, object) => {
    if(object.stars)
        await ReviewModel.updateOne({_id: kitId},{ $set: { "name": object.name} });
    if(object.comment)
        await ReviewModel.updateOne({_id: kitId},{ $set: { "description": object.description} });
    if(object.clientId) {
        const review = await getReviewById(revId);
        if(review.clientId != null)
            deleteAssociationToUser(review.clientId, revId)
        await ReviewModel.updateOne({_id: revId},{ $set: { "clientId": object.clientId} });
        associateToUser("array", "reviews", revId, object.clientId);
    }
    if(object.itemId) {
        const review = await getReviewById(revId);
        if(review.itemId != null)
            deleteAssociationToItem(review.itemId, revId)
        await ReviewModel.updateOne({_id: revId},{ $set: { "itemId": object.itemId} });
        associateToItem("array", "items", revId, object.itemId);
    }    
    return null;
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    deleteReview
}