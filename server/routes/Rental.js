const RentalModel = require("../models/RentalModel");
const { getItemById, updateItemRentalDates, checkIfAvailable, getCategoriesByItem } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");
const { associateToUser, getUserById} = require("../routes/User");
const { getKitById } = require("./Kit");

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

const createRental = async (object, userId, role) => {
    if(!object.startDate || !object.endDate || !userId  || !object.objectId)
        throw BadRequestError;

    if(object.kitId){
        object.rentalTarget = 'kit';
    }else object.rentalTarget = 'singolo';


    const start = new Date(object.startDate);
    if(start == new Date()) {
        if(role != 'cliente') {
            object.rentalType = 'istantaneo';
        }
        object.state = 'in corso'
    }else{
        object.rentalType = 'prenotazione';
        object.state = 'futura'
    }

    if(!checkIfAvailable(object))
        throw BadRequestError;
    if(!Array.isArray(object.objectId))
        object.objectId = [object.objectId]
    
    object.clientId = userId;
    object.itemId = object.objectId;

    //price and receipt

    const rental = await RentalModel.create(object);
    const dates = getDatesFromARange(object.startDate, object.endDate);
    object.timeInDays = dates.length;
    await updateItemRentalDates("add", dates, object.objectId);
    await associateToUser("array", "rentals", rental._id, userId);
    for(let id of object.objectId){
        if(await countSpecifiedPurchase(userId, id) >= global.config.favouritesTreshold){
            await associateToUser("array", "favItemsId", id, userId);
            const categories = await getCategoriesByItem(id);
            for(let cat of categories){
                await associateToUser("array", "favCategories", cat, userId);
            }
        }  
              
    }
    return rental;
}

const changeRentalState = async (id, newState) => {
    await RentalModel.updateOne({_id: id},{ $set: { "state": newState} });
    return null;
}

const countSpecifiedPurchase = async (userId, itemId) => {
    const user = await getUserById(userId);
    let count = 0;
    for(let elem of user.rentals){
        const rental = await getRentalById(elem);
        if(rental.kitId){
            const items = (await getKitById(rental.kitId)).items;
            for(let it of items) {
                if(itemId == it._id)
                    count = count + 1;
            }
        }else{
            if(itemId == rental.itemId[0])
                count = count + 1;
        }
    }
    return count+1;
}

const associateToRental = async (type, toModify, value, rentalId) => {
    const rental = await getRentalById(rentalId);
    if(type == "array") {
        let elem = JSON.stringify(rental);
        elem = JSON.parse(elem);
        switch (toModify) {
        }
    } else {
        switch (toModify) {
            case "rentalCertification": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "groupId": value} });
            }
            case "returnCertification": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "returnCertification": value} });
            }
            case "employerId": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "employerId": value} });
            }
        }
    }
}

module.exports = {
    getRentals,
    getRentalById,
    createRental,
    deleteRental,
    changeRentalState,
}