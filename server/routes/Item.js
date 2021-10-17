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

const updateItemRentalDates = async (opType, dates) => {
    if(opType == "add"){

    }
    if(opType == "remove"){

    }
}

module.exports = {
    getItems,
    getItemById,
    deleteItem,
    findItemByName,
    createItem,
    getItemsByCategoryId
}