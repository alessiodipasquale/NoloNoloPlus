const UserModel = require("../models/UserModel");
const { getAuthToken } = require("./User");
const { BadRequestError } = require("../config/errors");

const loginFront = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerFront = async (obj) => {  //req.body.username / password
    if(!obj.name || !obj.surname || !obj.clearTextPassword || !obj.username)
        throw BadRequestError;
    const user = await UserModel.create({name:obj.name, surname: obj.surname,username: obj.username, password: obj.clearTextPassword, role: 'cliente'});
    return user;
}

const loginDashboard = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerDashboard = async (obj) => {  //req.body.username / password
    if(!obj.name || !obj.surname || !obj.clearTextPassword || !obj.username)
        throw BadRequestError;
    const user = await UserModel.create({name:obj.name, surname: obj.surname,username: obj.username, password: obj.clearTextPassword, role: 'manager'});
    return user;
}

const loginBack = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerBack = async (obj) => {  //req.body.username / password
    if(!obj.name || !obj.surname || !obj.clearTextPassword || !obj.username)
        throw BadRequestError;
    const user = await UserModel.create({name:obj.name, surname: obj.surname, username: obj.username, password: obj.clearTextPassword, role: 'funzionario'});
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