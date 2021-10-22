const KitModel = require("../models/KitModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getKitById = async (id) => {
    const kit = await KitModel.findById(id)
    return kit;
}

const getKits = async () => {
    const kits =  await KitModel.find();
    return kits;
}

const deleteKit = async (id) => {
    const kit = await KitModel.deleteOne({_id: id})
    if(!kit)
        throw BadRequestError;
}

const createKit = async (object) => {
    //if(!object.name || !object.description)
    //    throw BadRequestError;
        
    const kit = await KitModel.create(object);
    return kit;
}

module.exports = {
    getKits,
    getKitById,
    createKit,
    deleteKit
}