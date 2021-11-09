const PropertyModel = require("../models/PropertyModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')
const { associateToPropertyValue, deleteAssociationToPropertyValue } = require("./associations/AssociationManager");

const getPropertyById = async (id) => {
    const property = await PropertyModel.findById(id)
    return property;
}

const getProperties = async () => {
    const properties =  await PropertyModel.find();
    return properties;
}

const deleteProperty = async (id) => {
    const functionalObj = {
        associatedValues: [],
    }
    await editProperty(id, functionalObj);
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

const editProperty = async (propId, object) => {
    if(object.name)
        await PropertyModel.updateOne({_id: propId},{ $set: { "name": object.name} });
    if(object.associatedValues){
        const property = await getPropertyById(propId);
        let elem = JSON.stringify(property);
        elem = JSON.parse(elem);
        let oldAssociated = elem.associatedValues;
        let toRemove = oldAssociated.filter(x => !object.associatedValues.includes(x));
        let toAdd = object.associatedValues.filter(x => !oldAssociated.includes(x));
        for(let elem of toRemove){
            deleteAssociationToPropertyValue(elem,propId)
        }
        for(let elem of toAdd){
            associateToPropertyValue("array", "associatedValues", propId, elem);
        }
        await PropertyModel.updateOne({_id: propId},{ $set: { "associatedValues": object.associatedValues} });
    }
    return null;
}

module.exports = {
    getProperties,
    getPropertyById,
    deleteProperty,
    findPropertyByName,
    createProperty,
    editProperty
}