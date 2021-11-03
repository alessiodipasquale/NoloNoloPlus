const KitModel = require("../models/KitModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')
const { getItemById, calculatePriceforItem, associateToItem, getReviewsByItemId } = require("./Item");
const { getPropertyValueById } = require("./PropertyValue");
const { getPropertyById } = require("./Property");
const { arrayUnion } = require("../utils/UtilityFuctions");

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
    if(!object.name || !object.description || !object.standardPrice || !object.items)
        throw BadRequestError;

    let allCategories = [];
    for(let itId of object.items){
        const item = await getItemById(itId);
        allCategories = arrayUnion(item.category, allCategories);
    }
    object.category = allCategories;
    const kit = await KitModel.create(object);
    for(let itId of object.items){
        await associateToItem("array", "kits", kit._id, itId);
    }
    return kit;
}

const calculatePriceforKit = async (object,kitId,userId) =>{
    if(!object.startDate || !object.endDate || !kitId || !userId)
        throw BadRequestError;

    const kit = await getKitById(kitId);

    let toReturn = {};
    const partialPrices = [];
    let finalKitPrice = 0;
    const kitReceipt = [];

    for(let itemId of kit.items){
        itemId = itemId._id;
        let rec = []
        rec.push("Resoconto item con id "+itemId)
        const fullPriceForItem = await calculatePriceforItem(object, itemId, userId);
        for(let e of fullPriceForItem.receipt)
            rec.push(e);
        partialPrices.push(rec);
        kitReceipt.push("Prezzo calcolato per l'oggetto con id "+itemId+": "+fullPriceForItem.finalPrice );
        finalKitPrice += fullPriceForItem.finalPrice;
    }
    kitReceipt.push("Alla somma viene applicato uno sconto del "+ global.config.kitDiscount+ "% per aver acquistato un kit");
    finalKitPrice = finalKitPrice - (finalKitPrice/100 * global.config.kitDiscount)

    toReturn.finalKitPrice = finalKitPrice;
    toReturn.partialPrices = partialPrices;
    toReturn.kitReceipt = kitReceipt;
    return toReturn;
}

const getReviewsByKitId = async (id) => {
    const kit = await getKitById(id);
    const toReturn = []
    for(let itemId of kit.items){
        const rev = await getReviewsByItemId(itemId)
        toReturn.push({itemId: itemId, reviews: rev})
    }
    return toReturn;
}

module.exports = {
    getKits,
    getKitById,
    createKit,
    deleteKit,
    calculatePriceforKit,
    getReviewsByKitId
}