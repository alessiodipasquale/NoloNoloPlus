const User = require("../models/User");

const getUserById = async (req, res) =>  {
    try {
        const user = await User.getById(req.params.id);
        res.send(user);
    } catch (err) {
        res.handle(err);
    }
}

const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getUsers,
    getUserById
}