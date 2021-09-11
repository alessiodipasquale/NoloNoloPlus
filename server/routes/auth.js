const User = require("../models/User");

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const clearTextPassword = req.body.password;
        const token = await User.getAuthToken(username, clearTextPassword);
        res.send({token})
    } catch (err) {
        res.handle(err)
    }
}

module.exports = {
    login
}