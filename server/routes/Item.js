const ItemModel = require('../models/ItemModel');
const {InventoryManager} = require('./InventoryManager');

const getItemById = (req,res) => {
    try {
        const item = InventoryManager.getItemById(req.params.id);
        res.send(item);
    } catch (err) {
        res.handle(err);
    }
}

const getItems = (req,res) => {
    try {
        const items = InventoryManager.getAllItems();
        res.send(items);
    } catch (err) {
        res.handle(err);
    }
}

const deleteItem = async (req,res) => {
    try {
        const item = await ItemModel.deleteOne({_id: req.params.id})
        InventoryManager.delete(item);
        res.send();
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getItems,
    getItemById,
    deleteItem
}