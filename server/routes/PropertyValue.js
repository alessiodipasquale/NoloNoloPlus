const PropertyValueModel = require("../models/PropertyValueModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getPropertyValueById = async (id) => {
    const propertyVal = await PropertyValueModel.findById(id)
    return propertyVal;
}

const getPropertyValues = async () => {
    const propertyValues =  await PropertyValueModel.find();
    return propertyValues;
}

const deletePropertyValue = async (id) => {
    const propertyVal = await PropertyValueModel.deleteOne({_id: id})
    if(!propertyVal)
        throw BadRequestError;
}

const createPropertyValue = async (object) => {
    if(!object.name)
        throw BadRequestError;
        
    /*
    if (await findPropertyValueByName(object.name))
        throw AlreadyExistsError;
    */
    const propertyVal = await PropertyValueyModel.create(object);
    return propertyVal;
}

module.exports = {
    getPropertyValues,
    getPropertyValueById,
    deletePropertyValue,
    createPropertyValue
}