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
    if(!object.value || !object.associatedProperty)
        throw BadRequestError;

    const propertyVal = await PropertyValueModel.create(object);
    await associateToProperty("array", "associatedValues",propertyVal._id,object.associatedProperty);
    return propertyVal;
}

const getPropertyValueByAttributes = async (property) =>{
    const propertyValuesIds = (await getPropertyById(property.associatedProperty)).associatedValues;
    for(let id of propertyValuesIds){
        const propVal = await getPropertyValueById(id)
        if(propVal){
            if(propVal.value == property.value ){
                if(property.unitOfMeasure){
                    if(propVal.unitOfMeasure){
                        if(property.unitOfMeasure.toLowerCase() == propVal.unitOfMeasure.toLowerCase()){
                            return propVal;
                        }else return null;
                    }else return null;
                }else{
                    if(propVal.unitOfMeasure){
                        return null;
                    }return propVal
                } 
            }
        }
    }
    return null;
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
    editPropertyValue,
    getPropertyValueByAttributes
}