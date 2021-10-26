const RentalModel = require("../models/RentalModel");
const { getItemById, updateItemRentalDates, checkIfAvailable } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");
const { associateToUser} = require("../routes/User");

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
    // TODO trasferire state e target in back
    if(!object.startDate || !object.state || !object.endDate || !object.timeInDays || !object.rentalTarget || !userId  || !object.objectId || !object.rentalType)
        throw BadRequestError;
    
    if(!checkIfAvailable(object))
        throw BadRequestError;
    if(!Array.isArray(object.objectId))
        object.objectId = [object.objectId]
    
    object.clientId = userId;
    object.itemId = object.objectId;

    const rental = await RentalModel.create(object);
    const dates = getDatesFromARange(object.startDate, object.endDate);
    await updateItemRentalDates("add", dates, object.objectId);
    await associateToUser("array", "rentals", rental._id, userId);
    //TODO controllare se l'oggetto è da aggiungere ai preferiti
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
    changeRentalState,
}