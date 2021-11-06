const RentalModel = require("../models/RentalModel");
const UserModel = require('../models/UserModel')
const { getItemById, updateItemRentalDates, checkIfAvailable, getCategoriesByItem, calculatePriceforItem } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");
const { associateToUser } = require("./associations/AssociationManager");
const { getKitById, calculatePriceforKit } = require("./Kit");

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
    //TODO Item ever been rented, rent count, etc...
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

    if(object.rentalTarget == 'kit'){
        const price = await calculatePriceforKit({startDate: object.startDate, endDate: object.endDate},object.kitId,userId)
        object.finalPrice = price.finalKitPrice;
        object.receipt = price.kitReceipt;
        object.partialPrices = price.partialPrices;
    }else{
        const price = await calculatePriceforItem({startDate: object.startDate, endDate: object.endDate},object.itemId[0],userId)
        object.finalPrice = price.finalPrice;
        object.receipt = price.receipt;
    }

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
    const user = await UserModel.findById(userId).select("-password -__v");
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



module.exports = {
    getRentals,
    getRentalById,
    createRental,
    deleteRental,
    changeRentalState,
}