const ItemModel = require('../models/ItemModel');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getCategoryById } = require('./Category');

const getItemById = async (id) => {
    const item = await ItemModel.findById(id)
    return item;
}

const getItems = async () => {
    const items =  await ItemModel.find();
    return items;
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
    const items = [];
    const category = await getCategoryById(id);
    const itemIds = category.associatedItems;
    for(let elem of itemIds) {
        const item = await getItemById(elem)
        items.push(item);
    }
    return items;
}

const updateItemRentalDates = async (opType, dates, itemIds) => {
    if(opType == "add"){
        for(var elem of itemIds){
            const item = getItemById(elem);
            var datesList = item.rentalDates;
            for(var elem of dates)
                datesList.push(elem);
            ItemModel.updateOne({_id: elem},{ $set: { "rentalDates": datesList} });
        }
    }
    if(opType == "remove"){
        for(var elem of itemIds){
            const item = getItemById(elem);
            var datesList = item.rentalDates;
            datesList.filter((date)=>{
                var ok = true
                for(var d in dates){
                    if(d == date)
                        ok = false;
                }
                return ok;
            })
            ItemModel.updateOne({_id: elem},{ $set: { "rentalDates": datesList} });
        }
    }
}

module.exports = {
    getItems,
    getItemById,
    deleteItem,
    findItemByName,
    createItem,
    getItemsByCategoryId,
    updateItemRentalDates
}