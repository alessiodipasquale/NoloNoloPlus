const UserModel = require("../models/UserModel");
const _ = require('lodash');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const { auth } = require('../config/params')
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getRentalById } = require("./Rental");
const { getItemById } = require("./Item");
const { getPropertyValueById } = require("./PropertyValue");
const { getPropertyById } = require("./Property");

const getUserById = async (id) =>  {
    const user = await UserModel.findById(id).select("-password -__v");
    return user;
}

const getAuthToken = async (username, clearTextPassword) => {
    const user = await UserModel.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw UnauthorizedError;

    const payload = { type:'user', user: _.omit(user, ['password', '__v'])}
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

const getRentalsByUserId = async (userId) => {
    const toReturn = [];
    const user = await getUserById(userId);
    const rentals = user.rentals;
    for(let rentalId of rentals){
        const rentalItems = [];
        const rental = await getRentalById(rentalId);
        for(let itemId of rental.itemId){
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
            let elem = JSON.stringify(item)
            elem = JSON.parse(elem)
            elem.properties = props;
            rentalItems.push(elem);
        }
        let elem = JSON.stringify(rental)
        elem = JSON.parse(elem)
        elem.items = rentalItems;
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
    getRentalsByUserId
}