const UserModel = require("../models/UserModel");
const _ = require('lodash');

const getUserById = async (req, res) =>  {
    try {
        const user = await UserModel.getById(req.params.id);
        res.send(user);
    } catch (err) {
        res.handle(err);
    }
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
    deleteUser
}