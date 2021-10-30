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

const associateToProperty = async (type, toModify, value, pId) => {
    const p = await getItemById(pId);
    if(type == "array") {
        let elem = JSON.stringify(p);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "associatedValues": {
                let associatedValues = elem.associatedValues;
                associatedValues.push(value);
                await PropertyModel.updateOne({_id: pId},{ $set: { "associatedValues": associatedValues} });
                break;
            }
        }
    }
}


module.exports = {
    getProperties,
    getPropertyById,
    deleteProperty,
    findPropertyByName,
    createProperty,
    associateToProperty
}