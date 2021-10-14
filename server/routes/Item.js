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

module.exports = {
    getItems,
    getItemById,
    deleteItem
}