const ItemModel = require('../models/ItemModel');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getCategoryById } = require('./Category');
const { getPropertyValueById } = require('./PropertyValue');
const { getPropertyById } = require('./Property');
const { getUserById } = require('./User');
const { getPriceDetail } = require('./PriceDetails');

const getItemById = async (id) => {
    const item = await ItemModel.findById(id)
    return item;
}

const filterGroups = (arrayOfItems) => {
    const toReturn = [];
    const groups = [];
    for(let item of arrayOfItems){
        if(item.groupId){
            if(!groups.includes(item.groupId)){
                groups.push(item.groupId);
                toReturn.push(item);
            }
        }else{
            toReturn.push(item)
        }
    }
    return toReturn;
}

const getItems = async () => {
    const toReturn = [];
    let items =  await ItemModel.find();
    items = filterGroups(items);
    for(let item of items){
        
        const props = [];
        for(let propId of item.properties){
            const propVal = await getPropertyValueById(propId);
            const prop = await getPropertyById(propVal.associatedProperty);
            const name = prop.name;
            const value = propVal.value;
            const unitOfMeasure = propVal.unitOfMeasure;
            props.push({name, value, unitOfMeasure});
        }
        let elem = JSON.stringify(item)
        elem = JSON.parse(elem)
        elem.properties = props;
        toReturn.push(elem);
    }
    return toReturn;
}

const deleteItem = async (id) => {
    const item = await ItemModel.deleteOne({_id: id})
    if(!item)
        throw BadRequestError;
}

const findItemByName = async (name) => {
    const item = await ItemModel.findOne({name: name});
    return item;
}

const createItem = async (object) => {
    if(!object.name || !object.description || !object.standardPrice || !object.state || !object.rentalDates)
        throw BadRequestError;

    const item = await ItemModel.create(object);
    return item;
}

const getItemsByCategoryId = async (id) => {
    const toReturn = [];
    const category = await getCategoryById(id);
    const itemIds = category.associatedItems;
    const items = [];
    for(let itemId of itemIds) {
        const item = await getItemById(itemId);
        items.push(item);
    }
    items = filterGroups(items);
    for(let item of items) {
        const props = [];
        for(let propId of item.properties){
            const propVal = await getPropertyValueById(propId);
            const prop = await getPropertyById(propVal.associatedProperty);
            const name = prop.name;
            const value = propVal.value;
            const unitOfMeasure = propVal.unitOfMeasure;
            props.push({name, value, unitOfMeasure});
        }
        let elem = JSON.stringify(item)
        elem = JSON.parse(elem)
        elem.properties = props;
        toReturn.push(elem);
    }
    return toReturn;
}

const updateItemRentalDates = async (opType, dates, objectId) => {
    if(opType == "add"){
        for(var id of objectId){
            const item = await getItemById(id);
            var datesList = item.rentalDates;

            if(!Array.isArray(dates))
                dates = [dates];

            for(var elem of dates){
                datesList.push(elem);
            }

            await ItemModel.updateOne({_id: id},{ $set: { "rentalDates": datesList} });
        }
    }
    if(opType == "remove"){
        for(var elem of objectId){
            const item = await getItemById(elem);
            var datesList = item.rentalDates;
            datesList.filter((date)=>{
                var ok = true
                for(var d in dates){
                    if(d == date)
                        ok = false;
                }
                return ok;
            })
            await ItemModel.updateOne({_id: elem},{ $set: { "rentalDates": datesList} });
        }
    }
}

const checkIfAvailable = async (object) => {
    if(!object.startDate || !object.endDate || !object.objectId)
        throw BadRequestError;
    
    if(!Array.isArray(object.objectId))
        object.objectId = [object.objectId];

    var isOk = true;
    for(var elem of object.objectId){
        const item = await getItemById(elem);
        const start = new Date(object.startDate);
        const end = new Date(object.endDate);
        for(let e of item.rentalDates){
            const elem = new Date(e)
            if (elem >= start && elem <= end){
                throw BadRequestError;
            }
        }
    }
    return isOk;
}

const associateToItem = async (type, toModify, value, itemId) => {
    const user = await getItemById(itemId);
    if(type == "array") {
        let elem = JSON.stringify(user);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "reviews": {
                let reviews = elem.reviews;
                reviews.push(value);
                await ItemModel.updateOne({_id: itemId},{ $set: { "reviews": reviews} });
                break;
            }
        }
    }/* else {

    }*/
}

const getReviewsByItemId = async (itemId) => {
    toReturn = [];
    const item = await getItemById(itemId);
    const reviews = item.reviews;
    for(let reviewId of reviews) {
        const review = await ReviewModel.findOne({_id: reviewId});
        const user = await getUserById(review.clientId);
        let rev = JSON.stringify(review)
        rev = JSON.parse(rev)
        rev.user = user;
        toReturn.push(rev);        
    }
    return toReturn;
}

const calculatePriceforItem = async (object,itemId, userId) =>{
    if(!object.startDate || !object.endDate || !itemId || !userId)
        throw BadRequestError;

    const item = await getItemById(itemId);
    const user = await getUserById(userId);
    const priceDetail = await getPriceDetail();

    let toReturn = {};
    let finalPrice = item.standardPrice;
    let discounted = 0;
    const receipt = [];
    receipt.push("Costo giornaliero: "+finalPrice+"€");

    const start = new Date(object.startDate);
    const end = new Date(object.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    finalPrice = diffDays * finalPrice;
    receipt.push("Costo non scontato per l'inter€o periodo: "+finalPrice+"€");

    //noleggio per oltre una settimana -> priceDetail.longUsageDiscountMultiplier
    if(diffDays >= 7){
        discounted = applyDiscount(finalPrice, priceDetail.longUsageDiscountMultiplier);
        receipt.push("Prezzo scontato per prenotazione lunga: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
        finalPrice = discounted;
    }

    //controllo punti fedeltà 
    if(user.loyaltyPoints >= 50000){
        discounted = finalPrice / 2;
    }else{
        discounted = finalPrice - (finalPrice / 100 * (user.loyaltyPoints/1000))
    }
    receipt.push("Prezzo scontato per punti fedeltà: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
    finalPrice = discounted;
    
    //se è nei preferiti -> priceDetail.discountMultiplier
    if(user.favItemsId.includes(item._id)){
        discounted = applyDiscount(finalPrice,priceDetail.fidelityPriceMultiplier);
        receipt.push("Prezzo scontato per ripetizione di noleggio: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
    }

    //stato dell'oggetto
    switch(item.state){
        case "ottimo":{
            discounted = applyDiscount(finalPrice,priceDetail.new_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
            break;
        }
        case "buono":{
            discounted = applyDiscount(finalPrice,priceDetail.verygood_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
            finalPrice = discounted;
            break;
        }
        case "usurato":{
            discounted = applyDiscount(finalPrice,priceDetail.good_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
            finalPrice = discounted;
            break;
        }
        case "molto usurato":{
            discounted = applyDiscount(finalPrice,priceDetail.worn_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
            finalPrice = discounted;
            break;
        }
        case "inutilizzabile":{
            discounted = applyDiscount(finalPrice,priceDetail.unusable_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: "+discounted+"€, sconto applicato di "+(finalPrice-discounted)+"€");
            finalPrice = discounted;
            break;
        }
    }

    toReturn.finalPrice = finalPrice;
    toReturn.receipt = receipt;
    return toReturn;
}

const applyDiscount = (price, multiplier) => {
    return price * multiplier;
}



module.exports = {
    getItems,
    getItemById,
    deleteItem,
    findItemByName,
    createItem,
    getItemsByCategoryId,
    updateItemRentalDates,
    checkIfAvailable,
    associateToItem,
    getReviewsByItemId,
    calculatePriceforItem
}