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

const loginDashboard = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerDashboard = async (username, clearTextPassword) => {  //req.body.username / password
    const user = await UserModel.create({username: username, password: clearTextPassword, role: 'manager'});
    return user;
}

const loginBack = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerBack = async (username, clearTextPassword) => {  //req.body.username / password
    const user = await UserModel.create({username: username, password: clearTextPassword, role: 'funzionario'});
    return user;
}

module.exports = {
    loginFront,
    registerFront,
    registerDashboard,
    loginDashboard,
    loginBack,
    registerBack
}