const ItemModel = require('../models/ItemModel');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getCategoryById } = require('./Category');
const { getPropertyValueById } = require('./PropertyValue');
const { getPropertyById } = require('./Property');
const { getUserById } = require('./User');

const getItemById = async (id) => {
    const item = await ItemModel.findById(id)
    return item;
}

const getItems = async () => {
    const toReturn = [];
    const items =  await ItemModel.find();
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
    for(let itemId of itemIds) {
        const item = await getItemById(itemId);
        //items.push(item);
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
        const user = await getUserById(review.itemId);
        let rev = JSON.stringify(review)
        rev = JSON.parse(rev)
        rev.user = user;
        toReturn.push(rev);        
    }
    return toReturn;
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
    getReviewsByItemId
}