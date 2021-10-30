const UserModel = require("../models/UserModel");
const RentalModel = require("../models/RentalModel");
const ReviewModel = require("../models/ReviewModel");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getItemById } = require("./Item");
const { getPropertyValueById } = require("./PropertyValue");
const { getPropertyById } = require("./Property");
const { getKitById } = require("./Kit");


const getUserById = async (id) =>  {
    const user = await UserModel.findById(id).select("-password -__v");
    return user;
}

const getAuthToken = async (username, clearTextPassword) => {
    const user = await UserModel.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw UnauthorizedError;

    let usr = JSON.stringify(user)
    usr = JSON.parse(usr)
    const payload = { type:'user', user: _.omit(usr, ['password', '__v'])}
    const token = jwt.sign(payload, process.env.JWT_SECRET).toString();
    return token;
}

const getUsers = async () => {
    const users = await UserModel.find().select(['-password','-__v'])
    return users;
}

const deleteUser = async (id) => {
    const user = await UserModel.deleteOne({_id: id})
    if(!user)
        throw BadRequestError;
}

const findUserByUsername = async (username) => {
    const user = await UserModel.findOne({username: username});
    return user;
}

const createUser = async (object) => {
    if(!object.username || !object.password || !object.name || !object.surname)
        throw BadRequestError;
        
    if (await findUserByUsername(object.username))
        throw AlreadyExistsError;

    const user = await UserModel.create(object);
    return user;
}

const editUser = async (userId, object) => {
    /*username, name, surname, favPaymentMethod (carta, alla consegna), address */
    if(object.name)
        await UserModel.updateOne({_id: userId},{ $set: { "name": object.name} });
    if(object.username)
        await UserModel.updateOne({_id: userId},{ $set: { "name": object.username} });
    if(object.surname)
        await UserModel.updateOne({_id: userId},{ $set: { "name": object.surname} });
    if(object.address)
        await UserModel.updateOne({_id: userId},{ $set: { "name": object.address} });

    if(object.favPaymentMethod && (object.favPaymentMethod == 'carta' || object.favPaymentMethod == 'alla consegna'))
        await UserModel.updateOne({_id: userId},{ $set: { "name": object.favPaymentMethod} });
    return null;
}

const associateToUser = async (type, toModify, value, userId) => {
    const user = await getUserById(userId);
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

const getReviewsByUserId = async (userId) => {
    toReturn = [];
    const user = await getUserById(userId);
    const reviews = user.reviews;
    for(let reviewId of reviews) {
        const review = await ReviewModel.findOne({_id: reviewId});
        const item = await getItemById(review.itemId);
        let rev = JSON.stringify(review)
        rev = JSON.parse(rev)
        rev.item = item;
        toReturn.push(rev);        
    }
    return toReturn;
}

const getRentalsByUserId = async (userId) => {
    const toReturn = [];
    const user = await getUserById(userId);
    const rentals = user.rentals;
    for(let rentalId of rentals){
        const rentalItems = [];
        let elem
        const rental = await RentalModel.findOne({_id: rentalId})//getRentalById(rentalId);
        if(rental.rentalTarget == 'kit'){
            const kit = await getKitById(rental.kitId)
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
                rentalItems.push(it);
            }
            let kitJson = JSON.stringify(kit)
            kitJson = JSON.parse(kitJson)
            elem = JSON.stringify(rental)
            elem = JSON.parse(elem)
            elem.kit = kitJson;
            elem.items = rentalItems;
        }else{
           // console.log("rental: ", rental);
            const item = await getItemById(rental.itemId)
            const props = [];
            for(let propId of item.properties){
                const propVal = await getPropertyValueById(propId);
                const prop = await getPropertyById(propVal.associatedProperty);
                const name = prop.name;
                const value = propVal.value;
                const unitOfMeasure = propVal.unitOfMeasure;                    
                props.push({name, value, unitOfMeasure});
            }
            const revs = [];
            for(let revId of item.reviews){
                const review = await ReviewModel.findOne({_id: revId});
                revs.push(review);
            }
            let it = JSON.stringify(item)
            it = JSON.parse(it);
            it.reviews = revs;
            it.properties = props;
            rentalItems.push(it);
            elem = JSON.stringify(rental)
            elem = JSON.parse(elem)
            elem.items = rentalItems;
        }
        
        toReturn.push(elem);
    }
    return toReturn;
}




module.exports = {
    getUsers,
    getUserById,
    getAuthToken,
    deleteUser,
    findUserByUsername,
    createUser,
    getRentalsByUserId,
    editUser,
    associateToUser,
    getReviewsByUserId
}