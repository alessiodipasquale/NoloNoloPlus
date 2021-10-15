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

module.exports = {
    getProperties,
    getPropertyById,
    deleteProperty
}