const { getAuthToken, getUserById } = require("./User");
const { BadRequestError, UnauthorizedError } = require("../config/errors");
const UserModel = require("../models/UserModel")

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
    const user = await UserModel.create({name:obj.name, surname: obj.surname,username: obj.username, password: obj.clearTextPassword, role: 'manager', certifications:[]});
    return user;
}

const loginBack = async (username, clearTextPassword) => { //req.body.username / password
    const token = await getAuthToken(username, clearTextPassword);
    return {token};
}

const registerBack = async (obj) => {  //req.body.username / password
    if(!obj.name || !obj.surname || !obj.clearTextPassword || !obj.username)
        throw BadRequestError;
    const user = await UserModel.create({name:obj.name, surname: obj.surname, username: obj.username, password: obj.clearTextPassword, role: 'funzionario', certifications:[]});
    return user;
}

const roleChecker = async (userId, required, controlType) => {
    const user = await getUserById(userId)
    switch(required){
        case 'funzionario':{
            if(user.role == 'cliente')
                if(controlType == "block")
                    throw UnauthorizedError;
                else return false
            break;
        }
        case 'manager':{
            if(user.role == 'funzionario' || user.role == 'cliente')
                if(controlType == "block")
                    throw UnauthorizedError;
                else return false
            break;
        }
    }
    return true;
}

module.exports = {
    loginFront,
    registerFront,
    registerDashboard,
    loginDashboard,
    loginBack,
    registerBack,
    roleChecker
}