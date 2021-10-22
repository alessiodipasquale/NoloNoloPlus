const RentalModel = require("../models/RentalModel");
const { getItemById, updateItemRentalDates, checkIfAvailable } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");

const getRentalById = async (id) => {
    const rental = await RentalModel.findById(id)
    return rental;
}

const getRentals = async () => {
    const rentals =  await RentalModel.find();
    return rentals;
}

const deleteRental = async () => {
    const rental = await RentalModel.deleteOne({_id: id})
    if(!rental)
        throw BadRequestError;
}

const createRental = async (object, userId) => {
    if(!object.startDate || !object.state || !object.endDate || !object.timeInDays || !object.rentalTarget || !userId  || !object.objectId || !object.rentalType)
        throw BadRequestError;
    
    if(!checkIfAvailable(object))
        throw BadRequestError;

    object.clientId = userId;
    const rental = await RentalModel.create(object);
    const dates = getDatesFromARange(object.startDate, object.endDate);
    updateItemRentalDates("add", dates, object.objectId)
    return rental;
}

const changeRentalState = async (id, newState) => {
    await RentalModel.updateOne({_id: id},{ $set: { "state": newState} });
    return null;
}

module.exports = {
    getRentals,
    getRentalById,
    createRental,
    deleteRental,
    changeRentalState
}