const ReviewModel = require("../models/ReviewModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToUser,associateToItem, deleteAssociationToUser, deleteAssociationToItem } = require("./associations/AssociationManager");

const getReviewById = async (id) => {
    const review = await ReviewModel.findById(id)
    return review;
}

const getReviews = async () => {
    const reviews =  await ReviewModel.find();
    return reviews;
}

const deleteReview = async (id) => {
    const functionalObj = {
        itemId: "toDelete",
        clientId: "toDelete",
    }
    await editReview(id, functionalObj);
    const review = await ReviewModel.deleteOne({_id: id})
    if(!review)
        throw BadRequestError;
}

const createReview = async (object, userId) => {
    if(!object.stars || !object.itemId)
        throw BadRequestError;
    if(!object.clientId)
        object.clientId = userId;
    const review = await ReviewModel.create(object);
    await associateToUser("array","reviews",review._id,object.clientId);
    await associateToItem("array","reviews",review._id,object.itemId);
    return review;
}

const editReview = async (revId, object) => {
    const review = await getReviewById(revId);
    let secureObject = JSON.stringify(review);
    secureObject = JSON.parse(secureObject);

    console.log(secureObject);

    if(object.stars)
        secureObject.stars = object.stars;
    if(object.comment)
        secureObject.comment = object.comment;
    if(object.clientId) {
        if(secureObject.clientId != null)
            deleteAssociationToUser(secureObject.clientId, revId)
        if(object.clientId != "toDelete") {
            secureObject.clientId = object.clientId;
            associateToUser("array", "reviews", revId, object.clientId);
        }
    }
    if(object.itemId) {
        if(secureObject.itemId != null)
            deleteAssociationToItem(secureObject.itemId, revId)
        if(object.itemId != "toDelete") {
            secureObject.itemId = object.itemId;
            associateToItem("array", "reviews", revId, object.itemId);
        }
    }    
    console.log(secureObject);
    await ReviewModel.updateOne({_id: revId}, secureObject);
    const toReturn = await getReviewById(revId);
    return toReturn;
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    deleteReview,
    editReview
}