const ItemModel = require('../../models/ItemModel');
const UserModel = require('../../models/UserModel');
const ReviewModel = require('../../models/ReviewModel');
const CategoryModel = require("../../models/CategoryModel");
const PropertyModel = require("../../models/PropertyModel");
const PropertyValueModel = require("../../models/PropertyValueModel");
const KitModel = require('../../models/KitModel');
const GroupModel = require('../../models/GroupModel');
const RentalModel = require('../../models/RentalModel');
const CertificationModel = require('../../models/CertificationModel');
/* Necessary to avoid circular dependencies */

///////////////////////////////////////////////////////////////////////////// Category

const deleteAssociationToCategory = async (categoryId, toDelete) => {
    const category = await CategoryModel.findOne({_id: categoryId});
    let elem = JSON.stringify(category);
    elem = JSON.parse(elem);

    let associatedItems = elem.associatedItems.filter(e => e != toDelete)
    await CategoryModel.updateOne({_id: categoryId},{ $set: { "associatedItems": associatedItems} });
}

const associateToCategory = async (type, toModify, value, catId) => {
    const category = await CategoryModel.findOne({_id: catId});
    if(type == "array") {
        let elem = JSON.stringify(category);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "associatedItems": {
                let associatedItems = elem.associatedItems;
                associatedItems.push(value);
                await CategoryModel.updateOne({_id: catId},{ $set: { "associatedItems": associatedItems} });
                break;
            }
        }
    }/* else {

    }*/
}

///////////////////////////////////////////////////////////////////////////////////// Item

const associateToItem = async (type, toModify, value, itemId) => {
    const item = await ItemModel.findOne({_id: itemId});
    if(type == "array") {
        let elem = JSON.stringify(item);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "reviews": {
                let reviews = elem.reviews;
                reviews.push(value);
                await ItemModel.updateOne({_id: itemId},{ $set: { "reviews": reviews} });
                break;
            }
            case "kits": {
                let kits = elem.kits;
                kits.push(value);
                await ItemModel.updateOne({_id: itemId},{ $set: { "kits": kits} });
                break;
            }
            case "category": {
                let cat = elem.category;
                cat.push(value);
                await ItemModel.updateOne({_id: itemId},{ $set: { "category": cat} });
                break;
            }
        }
    } else {
        switch (toModify) {
            case "groupId": {
                await ItemModel.updateOne({_id: itemId},{ $set: { "groupId": value} });
            }
        }
    }
}

const deleteAssociationToItem= async (itemId, toDelete) => {
    const item = await ItemModel.findOne(itemId);
    let elem = JSON.stringify(item);
    elem = JSON.parse(elem);

    if (elem.groupId == toDelete) await ItemModel.updateOne({_id: itemId},{ $set: { "groupId": null} }); 

    let category = elem.category.filter(e => e != toDelete)
    await ItemModel.updateOne({_id: itemId},{ $set: { "category": category} });

    let kits = elem.kits.filter(e => e != toDelete)
    await ItemModel.updateOne({_id: itemId},{ $set: { "kits": kits} });

    let properties = elem.properties.filter(e => e != toDelete)
    await ItemModel.updateOne({_id: itemId},{ $set: { "properties": properties} });

    let reviews = elem.reviews.filter(e => e != toDelete)
    await ItemModel.updateOne({_id: itemId},{ $set: { "reviews": reviews} });
}

///////////////////////////////////////////////////////////////////////////////////// Certification

const deleteAssociationToCertification = async (certificationId, toDelete) => {
    const certification = await CertificationModel.findOne({_id: certificationId});
    let elem = JSON.stringify(certification);
    elem = JSON.parse(elem);

    if (elem.employerId == toDelete) await CertificationModel.updateOne({_id: certificationId},{ $set: { "employerId": null} }); 
    if (elem.rentalId == toDelete) await CertificationModel.updateOne({_id: certificationId},{ $set: { "rentalId": null} }); 
}

///////////////////////////////////////////////////////////////////////////////////// Group

const deleteAssociationToGroup = async (groupId, toDelete) => {
    const group = await GroupModel.findOne({_id: groupId});
    let elem = JSON.stringify(group);
    elem = JSON.parse(elem);
    
    let items = elem.items.filter(e => e != toDelete)
    await GroupModel.updateOne({_id: groupId},{ $set: { "items": items} });
}


/////////////////////////////////////////////////////////////////////////////////////

const deleteAssociationToKit = async (kitId, toDelete) => {
    const kit = await KitModel.findOne({_id: kitId});
    let elem = JSON.stringify(kit);
    elem = JSON.parse(elem);

    let category = elem.category.filter(e => e != toDelete)
    await KitModel.updateOne({_id: kitId},{ $set: { "category": category} });

    let items = elem.items.filter(e => e != toDelete)
    await KitModel.updateOne({_id: kitId},{ $set: { "items": items} });
}

/////////////////////////////////////////////////////////////////////////////////////

const deleteAssociationToProperty = async (propId, toDelete) => {
    const prop = await PropertyModel.findOne({_id: propId});
    let elem = JSON.stringify(prop);
    elem = JSON.parse(elem);

    let associatedValues = elem.associatedValues.filter(e => e != toDelete)
    await PropertyModel.updateOne({_id: propId},{ $set: { "associatedValues": associatedValues} });
}

const associateToProperty = async (type, toModify, value, pId) => {
    const p = await PropertyModel.findOne({_id: pId});
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

/////////////////////////////////////////////////////////////////////////////////////


const associateToPropertyValue = async (type, toModify, value, pvId) => {
    const pv = await PropertyValueModel.findOne({_id: pvId});
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

const deleteAssociationToPropertyValue = async (propId, toDelete) => {
    const prop = await PropertyValueModel.findOne({_id: propId});
    let elem = JSON.stringify(prop);
    elem = JSON.parse(elem);

    if (elem.associatedProperty == toDelete){} //TODO: delete 

    let associatedItems = elem.associatedItems.filter(e => e != toDelete)
    await PropertyValueModel.updateOne({_id: propId},{ $set: { "associatedItems": associatedItems} });

}


/////////////////////////////////////////////////////////////////////////////////////

const associateToRental = async (type, toModify, value, rentalId) => {
    const rental = await RentalModel.findOne({_id: rentalId});
    if(type == "array") {
        let elem = JSON.stringify(rental);
        elem = JSON.parse(elem);
        switch (toModify) {
        }
    } else {
        switch (toModify) {
            case "rentalCertification": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "groupId": value} });
            }
            case "returnCertification": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "returnCertification": value} });
            }
            case "employerId": {
                await RentalModel.updateOne({_id: rentalId},{ $set: { "employerId": value} });
            }
        }
    }
}

const deleteAssociationToRental = async (rentalId, toDelete) => {
    const rental = await RentalModel.findOne({_id: rentalId});
    let elem = JSON.stringify(rental);
    elem = JSON.parse(elem);

    if (elem.clientId == toDelete) await RentalModel.updateOne({_id: rentalId},{ $set: { "clientId": null} }); 

    if (elem.employerId == toDelete) await RentalModel.updateOne({_id: rentalId},{ $set: { "employerId": null} }); 

    if (elem.kitId == toDelete) await RentalModel.updateOne({_id: rentalId},{ $set: { "kitId": null} }); 

    if (elem.rentalCertification == toDelete) await RentalModel.updateOne({_id: rentalId},{ $set: { "rentalCertification": null} }); 

    if (elem.returnCertification == toDelete) await RentalModel.updateOne({_id: rentalId},{ $set: { "returnCertification": null} }); 

    let itemId = elem.itemId.filter(e => e != toDelete)
    await RentalModel.updateOne({_id: rentalId},{ $set: { "itemId": itemId} });
}

/////////////////////////////////////////////////////////////////////////////////////

const deleteAssociationToReview = async (revId, toDelete) => {
    const review = await ReviewModel.findOne({_id: revId});
    let elem = JSON.stringify(review);
    elem = JSON.parse(elem);

    if (elem.clientId == toDelete) await ReviewModel.updateOne({_id: revId},{ $set: { "clientId": null} }); 
    if (elem.itemId == toDelete){}  //TODO: delete

}

/////////////////////////////////////////////////////////////////////////////////////

const deleteAssociationToUser = async (userId, toDelete) => {
    const user = await UserModel.findById(userId).select("-password -__v");
    let elem = JSON.stringify(user);
    elem = JSON.parse(elem);

    let favCategories = elem.favCategories.filter(e => e != toDelete)
    await UserModel.updateOne({_id: userId},{ $set: { "favCategories": favCategories} });

    let favItemsId = elem.favItemsId.filter(e => e != toDelete)
    await UserModel.updateOne({_id: userId},{ $set: { "favItemsId": favItemsId} });

    let rentals = elem.rentals.filter(e => e != toDelete)
    await UserModel.updateOne({_id: userId},{ $set: { "rentals": rentals} });

    let reviews = elem.reviews.filter(e => e != toDelete)
    await UserModel.updateOne({_id: userId},{ $set: { "reviews": reviews} });
}

const associateToUser = async (type, toModify, value, userId) => {
    const user = await UserModel.findById(userId).select("-password -__v");
    if(type == "array") {
        let elem = JSON.stringify(user);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "rentals": {
                let rentals = elem.rentals;
                rentals.push(value);
                await UserModel.updateOne({_id: userId},{ $set: { "rentals": rentals} });
                break;
            }
            case "reviews": {
                let reviews = elem.reviews;
                reviews.push(value);
                await UserModel.updateOne({_id: userId},{ $set: { "reviews": reviews} });
                break;
            }
            case "favItemsId": {
                let favItemsId = elem.favItemsId;
                if(!favItemsId.includes(value)){
                    favItemsId.push(value);
                    await UserModel.updateOne({_id: userId},{ $set: { "favItemsId": favItemsId} });
                }
                break;
            }
            case "favCategories": {
                let favCategories = elem.favCategories;
                if(!favCategories.includes(value)){
                    favCategories.push(value);
                    await UserModel.updateOne({_id: userId},{ $set: { "favCategories": favCategories} });
                }
                break;
            }
        }
    }/* else {

    }*/
}

/////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////


module.exports = {
    associateToCategory,
    deleteAssociationToCategory,
    associateToItem,
    deleteAssociationToItem,
    deleteAssociationToCertification,
    deleteAssociationToGroup,
    deleteAssociationToKit,
    deleteAssociationToProperty,
    associateToProperty,
    deleteAssociationToPropertyValue,
    associateToPropertyValue,
    deleteAssociationToRental,
    associateToRental,
    deleteAssociationToReview,
    deleteAssociationToUser,
    associateToUser
}