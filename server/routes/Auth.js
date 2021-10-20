const UserModel = require("../models/UserModel");
const { getAuthToken } = require("./User");

const loginFront = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerFront = async (username, clearTextPassword) => {  //req.body.username / password
    const user = await UserModel.create({username: username, password: clearTextPassword, role: 'cliente'});
    return user;
}

module.exports = {
    loginFront,
    registerFront
}