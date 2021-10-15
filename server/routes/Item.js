const ItemModel = require('../models/ItemModel');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')

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

module.exports = {
    getItems,
    getItemById,
    deleteItem,
    findItemByName,
    createItem
}