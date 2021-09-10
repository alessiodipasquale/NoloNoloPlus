const User = require("../models/User");

const getUserById = async (req, res) =>  {
    try {
        const user = await User.getById(req.params.id);
        res.send(user);
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getUserById
}