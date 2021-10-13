const UserModel = require("../models/UserModel");
const _ = require('lodash');
const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const { auth } = require('../config/params')
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../config/errors')

const getUserById = async (req, res) =>  {
    try {
        const user = await UserModel.findById(req.params.id).select("-password -__v");
        res.send(user);
    } catch (err) {
        res.handle(err);
    }
}

const getAuthToken = async (username, clearTextPassword) => {
    const user = await UserModel.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw UnauthorizedError;

    const payload = { type:'user', user: _.omit(user, ['password', '__v'])}
    const token = jwt.sign(payload, process.env.JWT_SECRET).toString();
    return token;
}

const getUsers = async (req,res) => {
    try {
        const users = await UserModel.find().select(['-password','-__v'])
        res.send(users);
    } catch (err) {
        res.handle(err);
    }
}

const deleteUser = async (req,res) => {
    try {
        const user = await UserModel.deleteOne({_id: req.params.id})
        res.send();
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    getAuthToken,
    deleteUser
}