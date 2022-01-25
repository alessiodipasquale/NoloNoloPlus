const RentalModel = require("../models/RentalModel");
const UserModel = require('../models/UserModel')
const { getItemById, updateItemRentalDates, checkIfAvailable, getCategoriesByItem, calculatePriceforItem, editItem } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");
const { associateToUser, associateToKit, associateToCertification, associateToItem, deleteAssociationToUser, deleteAssociationToCertification, deleteAssociationToKit, deleteAssociationToItem } = require("./associations/AssociationManager");
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

const deleteRental = async (id) => {
    const functionalObj = {
        clientId: "toDelete",
        employeeId: "toDelete",
        kitId: "toDelete",
        itemId: []
    }
    await fixDates(id)
    await editRental(id, functionalObj);
    const rental = await RentalModel.deleteOne({_id: id})
    if(!rental)
        throw BadRequestError;
}

const fixDates = async (rentalId) => {
    const rental = await getRentalById(rentalId);
    let items = rental.itemId;

    if(!Array.isArray(items))
        items = [items];

    const datesRange = getDatesFromARange(rental.startDate, rental.endDate);
    for(let itemId of items){
        const item = await getItemById(itemId)
        for(let date of item.rentalDates){
            for(let dateInRange of datesRange){
                if((new Date(date).toLocaleDateString()) == (new Date(dateInRange).toLocaleDateString())){
                    item.rentalDates = item.rentalDates.filter((elem)=>{
                        return elem != date;
                    })
                }
            }
        }

        await editItem(itemId,{rentalDates: item.rentalDates})
    }
}

const createRental = async (object, userId, role) => {
    /*
    Important note: userId is related to the user that make the request.
    If an employee create a rental for one user the clientId must be passed in the object    
    */
    if(object.kitId){
        object.rentalTarget = 'kit';
        const kit = await getKitById(object.kitId)
        object.objectId = kit.items;
    }else object.rentalTarget = 'singolo';

    if(!object.startDate || !object.endDate || !userId  || !object.objectId)
        throw BadRequestError;

    const start = new Date(object.startDate);
    if(start.toLocaleDateString() == new Date().toLocaleDateString()) {
        if(role != 'cliente') {
            object.rentalType = 'istantaneo';
        }
        object.state = 'in corso'
    }else{
        const end = new Date(object.endDate);
        if(end < new Date()){
            object.rentalType = 'prenotazione';
            object.state = 'terminata'

        }else{
            if(start < new Date()){
                object.rentalType = 'istantaneo';
                object.state = 'in corso'
            }else{
                object.rentalType = 'prenotazione';
                object.state = 'futura'
            }
        }
    }

    if(!checkIfAvailable(object))
        throw BadRequestError;
    if(!Array.isArray(object.objectId))
        object.objectId = [object.objectId]
    
    if(!object.clientId)
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

    if(object.modifyPrice && role != "cliente"){
        object.finalPrice = object.modifyPrice;
        object.receipt = ["Modified by an employee"];
    }

    const dates = getDatesFromARange(object.startDate, object.endDate);
    object.timeInDays = dates.length;

    const rental = await RentalModel.create(object);

    await updateItemRentalDates("add", dates, object.objectId);
    await associateToUser("array", "rentals", rental._id, object.clientId);
    for(let id of object.objectId){
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
    if(object.rentalType == "istantaneo" || object.state == "terminata"){  //if the employee create an instant rental for one user, the certification is automatically given
        await createCertification({rentalId: rental._id, certificationType: 'ritiro'},userId) 
    }
    if(object.state == "terminata"){  //if the employee create a past rental (special case)
        await createCertification({rentalId: rental._id, certificationType: 'riconsegna'},userId) 
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
    if(object.rentalType)
        secureObject.rentalType = object.rentalType;
    if(object.modifyPrice){
        secureObject.finalPrice = object.modifyPrice;
        secureObject.receipt = ["Modified by an employee"];
    }
    if(object.notes)
        secureObject.notes = object.notes;
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
    if(object.employeeId) {
        if(secureObject.employeeId != null)
            deleteAssociationToUser(secureObject.employeeId, rentalId)
        if(object.employeeId != "toDelete") {
            secureObject.employeeId = object.employeeId;
            associateToUser("array", "rentals", rentalId, object.employeeId);
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
    if(object.rentalCertification) {
        if(secureObject.rentalCertification != null)
            deleteAssociationToCertification(secureObject.rentalCertification, rentalId)
        if(object.rentalCertification != "toDelete") {
            secureObject.rentalCertification = object.rentalCertification;
            associateToCertification("array", "rentalId", rentalId, object.rentalCertification);
        }
    }
    if(object.returnCertification) {
        if(secureObject.returnCertification != null)
            deleteAssociationToCertification(secureObject.returnCertification, rentalId)
        if(object.returnCertification != "toDelete") {
            secureObject.returnCertification = object.returnCertification;
            associateToCertification("array", "rentalId", rentalId, object.returnCertification);
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