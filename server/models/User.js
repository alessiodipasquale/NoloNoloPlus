const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const { auth } = require('../config/params')
const _ = require('lodash');
const jwt = require('jsonwebtoken');


const UserModel = new mongoose.Schema({
    username: {type: String, required: true}, 
    password: {type: String, required: true},
    role: {
        type: String,
        enum : ['cliente','funzionario','manager'],
        default: 'cliente'
    },
}, { collection: "User"});

UserModel.pre('save', function (next) {
    const user = this;
    user.password = bcrypt.hashSync(user.password, auth.saltRounds);
    next();
});

const User = mongoose.model('User', UserModel)

User.getById = async (id) => {
    const user = await User.findById(id).select("-password -__v");
    return user
}

User.getAuthToken = async (username, clearTextPassword) => {
    const user = await User.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw UnauthorizedError;

    const payload = { type:'user', user: _.omit(user, ['password', '__v'])}
    const token = jwt.sign(payload, process.env.JWT_SECRET).toString();
    return token;
}

module.exports = User