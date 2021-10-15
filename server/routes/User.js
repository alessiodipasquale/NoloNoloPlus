const UserModel = require("../models/UserModel");
const _ = require('lodash');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const { auth } = require('../config/params')
const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')

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

module.exports = {
    getUsers,
    getUserById,
    getAuthToken,
    deleteUser,
    findUserByUsername,
    createUser
}