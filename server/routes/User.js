const UserModel = require("../models/UserModel");
const RentalModel = require("../models/RentalModel");
const ReviewModel = require("../models/ReviewModel");
const KitModel = require("../models/KitModel");
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getItemById } = require("./Item");
const { getPropertyValueById } = require("./PropertyValue");
const { getPropertyById } = require("./Property");
const { getKitById } = require("./Kit");

//TODO verify if user deletion is needed

const getUserById = async (id) =>  {
    const user = await UserModel.findById(id).select("-password -__v");
    return user;
}

const getAuthToken = async (username, clearTextPassword) => {
    const user = await UserModel.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw BadRequestError;

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

const getUsersByRole = async (role) => {
    const users = await UserModel.find({ role: role }).select(['-password','-__v'])
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
    const user = await getUserById(object._id);
    let secureObject = JSON.stringify(user);
    secureObject = JSON.parse(secureObject)
    
    if(object.name)
        secureObject.name = object.name;
    if(object.username)
        secureObject.username = object.name;
    if(object.surname)
        secureObject.surname = object.surname;
    if(object.address)
        secureObject.address = object.address;
    if(object.favPaymentMethod && (object.favPaymentMethod == 'carta' || object.favPaymentMethod == 'alla consegna'))
        secureObject.favPaymentMethod = object.favPaymentMethod;
        
    await UserModel.updateOne({_id: object._id},secureObject);
    return null;
}

const editUserAdvanced = async (userId, object) => {
    const user = await getUserById(object._id);
    let secureObject = JSON.stringify(user);
    secureObject = JSON.parse(secureObject)

    if(object.name)
        secureObject.name = object.name;
    if(object.username)
        secureObject.username = object.username;
    if(object.surname)
        secureObject.surname = object.surname;
    if(object.address)
        secureObject.address = object.address;
    if(object.favPaymentMethod && (object.favPaymentMethod == 'carta' || object.favPaymentMethod == 'alla consegna'))
        secureObject.favPaymentMethod = object.favPaymentMethod;
    if(object.role)
        secureObject.role = object.role

    if(object.loyaltyPoints)
        secureObject.loyaltyPoints = object.loyaltyPoints
    if(object.commentsFromOfficiers)
        secureObject.commentsFromOfficiers = object.commentsFromOfficiers
    if(object.favCategories)
        secureObject.favCategories = object.favCategories
    if(object.favItemsId)
        secureObject.favItemsId = object.favItemsId
        
    await UserModel.updateOne({_id: object._id},secureObject);
    return null;
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
            const kit = await KitModel.findById(rental.kitId);
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
                const revs = [];
                for(let revId of item.reviews){
                    const review = await ReviewModel.findOne({_id: revId});
                    if(review.clientId == userId)
                        revs.push(review);
                }
                let it = JSON.stringify(item)
                it = JSON.parse(it)
                it.properties = props;
                it.reviews = revs;
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
                if(review.clientId == userId)
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

const getUserDamage = async (userId) => {
    const rentals = await RentalModel.find({ clientId: userId })
    let tot = 0;
    for(let rental of rentals){
        tot = tot + rental.damage;
    }
    return {tot};
}

const getUserFavourites = async (id) => {
    const favIds = await getUserById(id).favItemsId;
    const toReturn = [];
    for(let favId of favIds){
        toReturn.push(await getItemById(favId))
    }
    return toReturn
}

const getUsersTotalDamage = async () => {
    const users = await getUsersByRole("cliente")
    const toReturn = [];
    for(let user of users){
        const totalDamage = await getUserDamage(user._id)
        toReturn.push({user, totalDamage:totalDamage.tot})
    }
    return toReturn;
}

const getEmployerRevenue = async (userId) => {
    const rentals = await RentalModel.find({ employerId: userId })
    let tot = 0;
    for(let rental of rentals){
        tot = tot + rental.finalPrice;
    }
    return tot;
}

const getEmployersTotalRevenue = async () => {
    const users = await getUsersByRole("funzionario")
    const toReturn = [];
    for(let user of users){
        const totalRevenue = await getEmployerRevenue(user._id)
        toReturn.push({user, totalRevenue})
    }
    return toReturn;
}

const getClientRevenue = async (userId) => {
    const rentals = await RentalModel.find({ clientId: userId })
    let tot = 0;
    for(let rental of rentals){
        tot = tot + rental.finalPrice;
    }
    return tot;
}

const getClientsTotalRevenue = async () => {
    const users = await getUsersByRole("cliente")
    const toReturn = [];
    for(let user of users){
        const totalRevenue = await getClientRevenue(user._id)
        const totalDamage = await getUserDamage(user._id)
        toReturn.push({user, totalRevenue, totalDamage:totalDamage.tot})
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
    editUserAdvanced,
    getReviewsByUserId,
    getUsersByRole,
    getUserDamage,
    getUsersTotalDamage,
    getUserFavourites,
    getEmployerRevenue,
    getEmployersTotalRevenue,
    getClientsTotalRevenue
}