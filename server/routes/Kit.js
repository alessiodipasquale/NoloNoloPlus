const KitModel = require("../models/KitModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')
const { getItemById } = require("./Item");
const { getPropertyValueById } = require("./PropertyValue");
const { getPropertyById } = require("./Property");

const getKitById = async (id) => {
    const kit = await KitModel.findById(id);
    const kitItems = [];
    for(let itemId of kit.items){
        const item = await getItemById(itemId)
        const props = [];
        for(let propId of item.properties){
            const propVal = await getPropertyValueById(propId);
            const prop = await getPropertyById(propVal.associatedProperty);
            const name = prop.name;
            const value = propVal.value;
            const unitOfMeasure = propVal.unitOfMeasure;
            props.push({name, value, unitOfMeasure});
        }
        let it = JSON.stringify(item)
        it = JSON.parse(it)
        it.properties = props;
        kitItems.push(it);
    }
    elem = JSON.stringify(kit)
    elem = JSON.parse(elem)
    elem.items = kitItems;
    return elem;
}

const getKits = async () => {
    const kits =  await KitModel.find();
    toReturn = [];
    for(let kit of kits){
        const k = await getKitById(kit.id)
        toReturn.push(k)
    }
    return toReturn;
}

const deleteKit = async (id) => {
    const kit = await KitModel.deleteOne({_id: id})
    if(!kit)
        throw BadRequestError;
}

const createKit = async (object) => {
    const kit = await KitModel.create(object);
    return kit;
}

module.exports = {
    getKits,
    getKitById,
    createKit,
    deleteKit
}