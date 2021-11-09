const PropertyValueModel = require("../models/PropertyValueModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToProperty } = require("./associations/AssociationManager");


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
    if(!object.name || !object.propertyId)
        throw BadRequestError;
        
    /*
    if (await findPropertyValueByName(object.name))
        throw AlreadyExistsError;
    */
    const propertyVal = await PropertyValueModel.create(object);
    await associateToProperty("array", "associatedValues",object.propertyId,propertyVal._id);
    return propertyVal;
}

const editPropertyValue = async (propValId, object) => {
    if(object.value)
        await PropertyValueModel.updateOne({_id: propValId},{ $set: { "value": object.value} });
    if(object.unitOfMeasure)
        await PropertyValueModel.updateOne({_id: propValId},{ $set: { "unitOfMeasure": object.unitOfMeasure} });
    
    if(object.associatedProperty) {
        const propertyValue = await getPropertyValueById(propValId);
        if(propertyValue.associatedProperty != null)
            deleteAssociationToProperty(propertyValue.associatedProperty, propValId)
        await PropertyValueModel.updateOne({_id: propValId},{ $set: { "associatedProperty": object.associatedProperty} });
        associateToProperty("array", "associatedValues", propValId, object.associatedProperty);
    }
    
    if(object.associatedItems){
        const propertyValue = await getPropertyValueById(propValId);
        let elem = JSON.stringify(propertyValue);
        elem = JSON.parse(elem);
        let oldAssociated = elem.associatedItems;
        let toRemove = oldAssociated.filter(x => !object.associatedItems.includes(x));
        let toAdd = object.associatedItems.filter(x => !oldAssociated.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,propValId)
        }
        for(let elem of toAdd){
            associateToItem("array", "properties", propValId, elem);
        }
        await PropertyValueModel.updateOne({_id: propValId},{ $set: { "associatedItems": object.associatedItems} });
    }
    return null;
}

module.exports = {
    getPropertyValues,
    getPropertyValueById,
    deletePropertyValue,
    createPropertyValue,
    editPropertyValue
}