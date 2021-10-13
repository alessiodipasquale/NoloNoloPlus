const ItemModel = require('../models/ItemModel');

const getItemById = async (req,res) => {
    try {
        const item = await ItemModel.findById(req.params.id);
        res.send(item);
    } catch (err) {
        res.handle(err);
    }
}

const getItems = async (req,res) => {
    try {
        const items = await ItemModel.find();
        res.send(items);
    } catch (err) {
        res.handle(err);
    }
}

const deleteItem = async (req,res) => {
    try {
        const item = await ItemModel.deleteOne({_id: req.params.id})
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