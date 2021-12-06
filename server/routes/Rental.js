const RentalModel = require("../models/RentalModel");
const UserModel = require('../models/UserModel')
const { getItemById, updateItemRentalDates, checkIfAvailable, getCategoriesByItem, calculatePriceforItem } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");
const { associateToUser, associateToKit, associateToItem } = require("./associations/AssociationManager");
const { getKitById, calculatePriceforKit } = require("./Kit");
const { createCertification } = require("./Certification");
const { updateRentalsCount } = require("./Item");

const getRentalById = async (id) => {
    const rental = await RentalModel.findById(id)
    return rental;
}

const getRentals = async () => {
    const rentals =  await RentalModel.find();
    return rentals;
}

const deleteRental = async () => {
    const functionalObj = {
        clientId: "toDelete",
        employerId: "toDelete",
        kitId: "toDelete",
        itemId: []
    }
    await editRental(id, functionalObj);
    const rental = await RentalModel.deleteOne({_id: id})
    if(!rental)
        throw BadRequestError;
}

const createRental = async (object, userId, role) => {
    /*
    Important note: userId is related to the user that make the request.
    If an employer create a rental for one user the clientId must be passed in the object    
    */
    //TODO Item ever been rented, rent count, etc...
    if(!object.startDate || !object.endDate || !userId  || !object.itemIds)
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
    if(!Array.isArray(object.itemIds))
        object.itemIds = [object.itemIds]
    
    if(role == 'cliente')
        object.clientId = userId;
    object.itemId = object.itemIds;

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
    await updateItemRentalDates("add", dates, object.itemIds);
    await associateToUser("array", "rentals", rental._id, object.clientId);
    for(let id of object.itemIds){
        if(await countSpecifiedPurchase(object.clientId, id) >= global.config.favouritesTreshold){
            await associateToUser("array", "favItemsId", id, object.clientId);
            const categories = await getCategoriesByItem(id);
            for(let cat of categories){
                await associateToUser("array", "favCategories", cat, object.clientId);
            }
        }        
        await associateToItem("array","rentals",rental._id,id);
        await updateRentalsCount(id);
    }
    if(object.rentalType == "istantaneo"){  //if the employer create an instant rental for one user, the certification is automatically given
        await createCertification({rentalId: rental._id, certificationType: 'ritiro'},object.employerId) 
    }
    if(object.rentalTarget == 'kit'){
        await associateToKit("array","rentals",rental._id,object.kitId);
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

const editRental = async (rentalId, object) => {
    const rental = await getRentalById(rentalId);
    let secureObject = JSON.stringify(rental);
    secureObject = JSON.parse(secureObject);
    /*if(object.startDate)
        await RentalModel.updateOne({_id: rentalId},{ $set: { "startDate": object.startDate} });*/
    /*if(object.endDate)
        await RentalModel.updateOne({_id: rentalId},{ $set: { "endDate": object.endDate} });*/
    if(object.rentalType)
        secureObject.rentalType = object.rentalType;
    if(object.rentalTarget)
        secureObject.rentalTarget = object.rentalTarget;
    if(object.state)
        secureObject.state = object.state
    
    if(object.clientId) {
        if(secureObject.clientId != null)
            deleteAssociationToUser(secureObject.clientId, rentalId)
        if(object.clientId != "toDelete") {
            secureObject.clientId = object.clientId;
            associateToUser("array", "rentals", rentalId, object.clientId);
        }
    }
    if(object.employerId) {
        if(secureObject.employerId != null)
            deleteAssociationToUser(secureObject.employerId, rentalId)
        if(object.employerId != "toDelete") {
            secureObject.employerId = object.employerId;
            associateToUser("array", "rentals", rentalId, object.employerId);
        }
    }
    if(object.kitId) {
        if(secureObject.kitId != null)
            deleteAssociationToKit(secureObject.kitId, rentalId)
        if(object.kitId != "toDelete") {
            secureObject.kitId = object.kitId
            associateToKit("array", "rentals", rentalId, object.kitId);
        }
    }
    if(object.itemId){
        let oldAssociated = secureObject.itemId;
        let toRemove = oldAssociated.filter(x => !object.itemId.includes(x));
        let toAdd = object.itemId.filter(x => !oldAssociated.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,rentalId)
        }
        for(let elem of toAdd){
            associateToItem("array", "rentals", rentalId, elem);
        }
        secureObject.itemId = object.itemId
    }
    await RentalModel.updateOne({_id: rentalId},secureObject);
    return null;
}


module.exports = {
    getRentals,
    getRentalById,
    createRental,
    deleteRental,
    changeRentalState,
    editRental
}