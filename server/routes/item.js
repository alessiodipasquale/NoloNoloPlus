const Item = require('../models/Item');

const getItemById = async (req,res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.send(item);
    } catch (err) {
        res.handle(err);
    }
}

const getItems = async (req,res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (err) {
        res.handle(err);
    }
}

const deleteItem = async (req,res) => {
    try {
        const item = await Item.deleteOne({_id: req.params.id})
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