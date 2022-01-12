const PropertyValueModel = require("../models/PropertyValueModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToProperty } = require("./associations/AssociationManager");
const { getPropertyById } = require("./Property")


const getPropertyValueById = async (id) => {
    const propertyVal = await PropertyValueModel.findById(id)
    return propertyVal;
}

const getPropertyValues = async () => {
    const toReturn = []
    const propertyValues =  await PropertyValueModel.find();
    for(let elem of propertyValues){
        toReturn.push(await generateFullPropVal(elem))
    }
    return toReturn;
}

const deletePropertyValue = async (id) => {
    const functionalObj = {
        associatedProperty: "toDelete",
        associatedItems: []
    }
    await editPropertyValue(id, functionalObj);
    const propertyVal = await PropertyValueModel.deleteOne({_id: id})
    if(!propertyVal)
        throw BadRequestError;
}

const createPropertyValue = async (object) => {
    if(!object.name || !object.associatedProperty)
        throw BadRequestError;
    /*
    if (await findPropertyValueByName(object.name))
        throw AlreadyExistsError;
    */
    const propertyVal = await PropertyValueModel.create(object);
    await associateToProperty("array", "associatedValues",object.associatedProperty,propertyVal._id);
    return propertyVal;
}

const editPropertyValue = async (propValId, object) => {
    const propertyValue = await getPropertyValueById(propValId);
    let secureObject = JSON.stringify(propertyValue);
    secureObject = JSON.parse(secureObject);

    if(object.value)
        secureObject.value = object.value;
    if(object.unitOfMeasure)
        secureObject.unitOfMeasure = object.unitOfMeasure
    
    if(object.associatedProperty) {
        if(secureObject.associatedProperty != null)
            deleteAssociationToProperty(secureObject.associatedProperty, propValId)
        if(object.associatedProperty != "toDelete") {
            secureObject.associatedProperty = object.associatedProperty
            associateToProperty("array", "associatedValues", propValId, object.associatedProperty);
        }
    }
    
    if(object.associatedItems){
        let oldAssociated = secureObject.associatedItems;
        let toRemove = oldAssociated.filter(x => !object.associatedItems.includes(x));
        let toAdd = object.associatedItems.filter(x => !oldAssociated.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,propValId)
        }
        for(let elem of toAdd){
            associateToItem("array", "properties", propValId, elem);
        }
        secureObject.associatedItems = object.associatedItems;
    }
    await PropertyValueModel.updateOne({_id: propValId},secureObject);
    return null;
}

const generateFullPropVal = async (basePropVal) =>{
    const generalProp = await getPropertyById(basePropVal.associatedProperty);
    let elem = JSON.stringify(basePropVal)
    elem = JSON.parse(elem)
    elem.associatedProperty = generalProp;
    return elem
}

module.exports = {
    getPropertyValues,
    getPropertyValueById,
    deletePropertyValue,
    createPropertyValue,
    editPropertyValue
}