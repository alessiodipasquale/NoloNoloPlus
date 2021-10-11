const User = require("../models/User");

const loginFront = async (req, res) => {
    try {
        const username = req.body.username;
        const clearTextPassword = req.body.password;
        const token = await User.getAuthToken(username, clearTextPassword);
        res.send({token})
    } catch (err) {
        res.handle(err)
    }
}

const registerFront = async (req,res) => {
    try {
        const username = req.body.username;
        const clearTextPassword = req.body.password;
        const user = await User.create({username: username, password: clearTextPassword, role: 'cliente'});
        res.send();
    } catch (err) {
        res.handle(err)
    }
}

module.exports = {
    loginFront,
    registerFront
}