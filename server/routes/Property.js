const PropertyModel = require("../models/PropertyModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getPropertyById = async (id) => {
    const property = await PropertyModel.findById(id)
    return property;
}

const getProperties = async () => {
    const properties =  await PropertyModel.find();
    return properties;
}

const deleteProperty = async (id) => {
    const property = await PropertyModel.deleteOne({_id: id})
    if(!property)
        throw BadRequestError;
}

const findPropertyByName = async (name) => {
    const property = await PropertyModel.findOne({name: name});
    return property;
}

const createProperty = async (object) => {
    if(!object.name)
        throw BadRequestError;
        
    if (await findPropertyByName(object.name))
        throw AlreadyExistsError;

    const property = await PropertyModel.create(object);
    return property;
}


module.exports = {
    getProperties,
    getPropertyById,
    deleteProperty,
    findPropertyByName,
    createProperty,
}