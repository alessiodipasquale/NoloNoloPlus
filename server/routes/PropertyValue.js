const PropertyValueModel = require("../models/PropertyValueModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToProperty } = require("./Property");


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

const associateToPropertyValue = async (type, toModify, value, pvId) => {
    const pv = await getItemById(pvId);
    if(type == "array") {
        let elem = JSON.stringify(pv);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "associatedItems": {
                let associatedItems = elem.associatedItems;
                associatedItems.push(value);
                await PropertyValueModel.updateOne({_id: pvId},{ $set: { "associatedItems": associatedItems} });
                break;
            }
        }
    }/* else {

    }*/
}

module.exports = {
    getPropertyValues,
    getPropertyValueById,
    deletePropertyValue,
    createPropertyValue,
    associateToPropertyValue
}