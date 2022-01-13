const ItemModel = require('../models/ItemModel');
const UserModel = require('../models/UserModel')
const ReviewModel = require('../models/ReviewModel');
const CategoryModel = require("../models/CategoryModel");
const PropertyModel = require("../models/PropertyModel");
const PropertyValueModel = require("../models/PropertyValueModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { associateToCategory, associateToGroup, associateToPropertyValue, deleteAssociationToGroup, deleteAssociationToCategory } = require('./associations/AssociationManager');
const { deleteAssociationToKit, associateToKit, deleteAssociationToPropertyValue } = require('./associations/AssociationManager')
const { getPriceDetail } = require('./PriceDetails');
const { createPropertyValue, getPropertyValueByAttributes } = require('./PropertyValue')

const getItemById = async (id) => {
    const item = await ItemModel.findById(id)
    return item;
}

const filterGroups = (arrayOfItems) => {
    const toReturn = [];
    const groups = [];
    for (let item of arrayOfItems) {
        if (item.groupId) {
            if (!groups.includes(item.groupId)) {
                groups.push(item.groupId);
                toReturn.push(item);
            }
        } else {
            toReturn.push(item)
        }
    }
    return toReturn;
}

const getItems = async (filter) => {
    const toReturn = [];
    let items = await ItemModel.find();
    if(filter)
        items = filterGroups(items);
    for (let item of items) {
        toReturn.push(await generateFullItem(item));
    }
    return toReturn;
}

const deleteItem = async (id) => {
    const functionalObj = {
        groupId: "toDelete",
        category: [],
        kits: [],
        properties: []
    }
    await editItem(id, functionalObj);
    const item = await ItemModel.deleteOne({ _id: id })
    if (!item)
        throw BadRequestError;
}

const findItemByName = async (name) => {
    const item = await ItemModel.findOne({ name: name });
    return item;
}

const createItem = async (object) => {
    if (!object.name || !object.description || !object.standardPrice || !object.state || !object.category)
        throw BadRequestError;

    //category
    if (!Array.isArray(object.category))
        object.category = [object.category]
    
    //properties
    object.properties = []
    if (object.propertiesList != [] ) {
        for(let property of object.propertiesList){
            let prop = await getPropertyValueByAttributes(property);
            if(prop == null){
                prop = await createPropertyValue(property);
            }
            object.properties.push(prop._id)
        }
    };
    const item = await ItemModel.create(object);

    for (let cat of object.category) {
        await associateToCategory("array", "associatedItems", item._id, cat);
    }
    for (let prop of object.properties) {
        await associateToPropertyValue("array", "associatedItems", item._id, prop);
    }
    if(object.groupId){
        await associateToGroup("array", "items", item._id, object.groupId);
    }

    return await generateFullItem(item);
}

const generateFullItem = async (baseItem) => {
    const props = [];
    const categories = [];
    for (let propId of baseItem.properties) {
        const propVal = await PropertyValueModel.findOne({ _id: propId });
        const prop = await PropertyModel.findOne({ _id: propVal.associatedProperty });
        const name = prop.name;
        const value = propVal.value;
        const unitOfMeasure = propVal.unitOfMeasure;
        props.push({ name, value, unitOfMeasure });
    }
    for (let catId of baseItem.category) {
        const category = await CategoryModel.findOne({ _id: catId });
        categories.push({ name: category.name, description: category.description });
    }
    let elem = JSON.stringify(baseItem)
    elem = JSON.parse(elem)
    elem.properties = props;
    elem.categories = categories;
    return elem;
}

const getItemsByCategoryId = async (id) => {
    const toReturn = [];
    const category = await CategoryModel.findOne({ _id: id });
    const itemIds = category.associatedItems;
    let items = [];
    for (let itemId of itemIds) {
        const item = await getItemById(itemId);
        items.push(item);
    }
    items = filterGroups(items);
    for (let item of items) {
        const props = [];
        for (let propId of item.properties) {
            const propVal = await PropertyValueModel.findOne({ _id: propId });
            const prop = await PropertyModel.findOne({ _id: propVal.associatedProperty });
            const name = prop.name;
            const value = propVal.value;
            const unitOfMeasure = propVal.unitOfMeasure;
            props.push({ name, value, unitOfMeasure });
        }
        let elem = JSON.stringify(item)
        elem = JSON.parse(elem)
        elem.properties = props;
        toReturn.push(elem);
    }
    return toReturn;
}

const updateItemRentalDates = async (opType, dates, objectId) => {
    if (opType == "add") {
        for (var id of objectId) {
            const item = await getItemById(id);
            var datesList = item.rentalDates;

            if (!Array.isArray(dates))
                dates = [dates];

            for (var elem of dates) {
                datesList.push(elem);
            }

            await ItemModel.updateOne({ _id: id }, { $set: { "rentalDates": datesList } });
        }
    }
    if (opType == "remove") {
        for (var elem of objectId) {
            const item = await getItemById(elem);
            var datesList = item.rentalDates;
            datesList.filter((date) => {
                var ok = true
                for (var d in dates) {
                    if (d == date)
                        ok = false;
                }
                return ok;
            })
            await ItemModel.updateOne({ _id: elem }, { $set: { "rentalDates": datesList } });
        }
    }
}

const checkIfAvailable = async (object) => {
    if (!object.startDate || !object.endDate || !object.objectId)
        throw BadRequestError;

    if (!Array.isArray(object.objectId))
        object.objectId = [object.objectId];

    var isOk = true;
    for (var elem of object.objectId) {
        const item = await getItemById(elem);
        const start = new Date(object.startDate);
        const end = new Date(object.endDate);
        console.log(item.rentalDates)
        for (let e of item.rentalDates) {
            const elem = new Date(e)
            if (elem >= start && elem <= end) {
                throw BadRequestError;
            }
        }
    }
    return isOk;
}
const getReviewsByItemId = async (itemId) => {
    toReturn = [];
    const item = await getItemById(itemId);
    const reviews = item.reviews;
    for (let reviewId of reviews) {
        const review = await ReviewModel.findOne({ _id: reviewId });
        const user = await UserModel.findById(review.clientId).select("-password -__v")
        let rev = JSON.stringify(review)
        rev = JSON.parse(rev)
        rev.user = user;
        toReturn.push(rev);
    }
    return toReturn;
}

const calculatePriceforItem = async (object, itemId, userId) => {
    if (!object.startDate || !object.endDate || !itemId)
        throw BadRequestError;

    const item = await getItemById(itemId);
    const priceDetail = await getPriceDetail();

    let toReturn = {};
    let finalPrice = item.standardPrice;
    let discounted = 0;
    const receipt = [];
    receipt.push("Costo giornaliero: " + finalPrice + "€");

    const start = new Date(object.startDate);
    const end = new Date(object.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    finalPrice = diffDays * finalPrice;
    receipt.push("Costo non scontato per l'intero periodo: " + finalPrice + "€");

    if (userId != null) {
        const user = await UserModel.findById(userId).select("-password -__v")
        //noleggio per oltre una settimana -> priceDetail.longUsageDiscountMultiplier
        if (diffDays >= 7) {
            discounted = applyDiscount(finalPrice, priceDetail.longUsageDiscountMultiplier);
            receipt.push("Prezzo scontato per prenotazione lunga: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
        }

        //controllo punti fedeltà 
        if (user.loyaltyPoints >= 50000) {
            discounted = finalPrice / 2;
        } else {
            discounted = finalPrice - (finalPrice / 100 * (user.loyaltyPoints / 1000))
        }
        receipt.push("Prezzo scontato per punti fedeltà: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
        finalPrice = discounted;

        //se è nei preferiti -> priceDetail.discountMultiplier
        if (user.favItemsId.includes(item._id)) {
            discounted = applyDiscount(finalPrice, priceDetail.fidelityPriceMultiplier);
            receipt.push("Prezzo scontato per ripetizione di noleggio: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
        }
    }

    //stato dell'oggetto
    switch (item.state) {
        case "ottimo": {
            discounted = applyDiscount(finalPrice, priceDetail.verygood_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
            break;
        }
        case "buono": {
            discounted = applyDiscount(finalPrice, priceDetail.good_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
            break;
        }
        case "usurato": {
            discounted = applyDiscount(finalPrice, priceDetail.worn_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
            break;
        }
        case "molto usurato": {
            discounted = applyDiscount(finalPrice, priceDetail.veryworn_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
            break;
        }
        case "inutilizzabile": {
            discounted = applyDiscount(finalPrice, priceDetail.unusable_state);
            receipt.push("Prezzo scontato per stato dell'oggetto: " + discounted + "€, sconto applicato di " + (finalPrice - discounted) + "€");
            finalPrice = discounted;
            break;
        }
    }

    toReturn.finalPrice = finalPrice;
    toReturn.receipt = receipt;
    return toReturn;
}

const applyDiscount = (price, multiplier) => {
    return price * multiplier;
}

const getCategoriesByItem = async (id) => {
    const item = await getItemById(id);
    return item.category;
}

const editItem = async (itemId, object) => {
    const item = await getItemById(itemId);
    let secureObject = JSON.stringify(item);
    secureObject = JSON.parse(secureObject);

    if (object.name)
        secureObject.name = object.name;
    if (object.description)
        secureObject.description = object.description;
    if (object.standardPrice)
        secureObject.standardPrice = object.standardPrice;
    if (object.imgSrc)
        secureObject.imgSrc = object.imgSrc;
    if (object.state)
        secureObject.state = object.state;
    if (object.groupId) {
        if (secureObject.groupId != null)
            deleteAssociationToGroup(secureObject.groupId, itemId)
        if (object.groupId != "toDelete") {
            secureObject.groupId = object.groupId;
            associateToGroup("array", "items", itemId, object.groupId);
        }
    }
    if (object.category) {
        let oldAssociated = secureObject.category;
        let toRemove = oldAssociated.filter(x => !object.category.includes(x));
        let toAdd = object.category.filter(x => !oldAssociated.includes(x));
        for (let elem of toRemove) {
            deleteAssociationToCategory(elem, itemId)
        }
        for (let elem of toAdd) {
            associateToCategory("array", "associatedItems", itemId, elem);
        }
        secureObject.category = object.category;
    }
    if (object.kits) {
        let oldAssociated = secureObject.kits;
        let toRemove = oldAssociated.filter(x => !object.kits.includes(x));
        let toAdd = object.kits.filter(x => !oldAssociated.includes(x));
        for (let elem of toRemove) {
            deleteAssociationToKit(elem, itemId)
        }
        for (let elem of toAdd) {
            associateToKit("array", "items", itemId, elem);
        }
        secureObject.kits = object.kits;
    }
    if (object.properties) {
        let oldAssociated = secureObject.properties;
        let toRemove = oldAssociated.filter(x => !object.properties.includes(x));
        let toAdd = object.properties.filter(x => !oldAssociated.includes(x));
        for (let elem of toRemove) {
            deleteAssociationToPropertyValue(elem, itemId)
        }
        for (let elem of toAdd) {
            associateToPropertyValue("array", "associatedItems", itemId, elem);
        }
        secureObject.properties = object.properties;
    }
    await ItemModel.updateOne({ _id: itemId }, secureObject);
    return null;
}

const updateRentalsCount = async (itemId) => {
    const item = await getItemById(itemId);
    let obj = JSON.stringify(item);
    obj = JSON.parse(obj);
    if (obj.rentCount == 0) {
        obj.everBeenRented = true;
    }
    obj.rentCount = obj.rentCount + 1;
    await ItemModel.updateOne({ _id: itemId }, obj);
}

module.exports = {
    getItems,
    getItemById,
    deleteItem,
    findItemByName,
    createItem,
    getItemsByCategoryId,
    updateItemRentalDates,
    checkIfAvailable,
    getReviewsByItemId,
    calculatePriceforItem,
    getCategoriesByItem,
    editItem,
    updateRentalsCount
}