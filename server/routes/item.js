const Item = require('../models/Item');

const getItemById = async (req,res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.send(item);
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getItemById
}