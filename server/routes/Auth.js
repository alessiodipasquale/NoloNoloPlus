const UserModel = require("../models/UserModel");

const loginFront = async (req, res) => {
    try {
        const username = req.body.username;
        const clearTextPassword = req.body.password;
        const token = await UserModel.getAuthToken(username, clearTextPassword);
        res.send({token})
    } catch (err) {
        res.handle(err)
    }
}

const registerFront = async (req,res) => {
    try {
        const username = req.body.username;
        const clearTextPassword = req.body.password;
        const user = await UserModel.create({username: username, password: clearTextPassword, role: 'cliente'});
        res.send();
    } catch (err) {
        res.handle(err)
    }
}

module.exports = {
    loginFront,
    registerFront
}