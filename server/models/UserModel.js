const mongoose =require('mongoose');
const uniqid = require('uniqid');
const bcrypt = require('bcrypt');
const { auth } = require('../config/params')
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../config/errors')

var Schema = mongoose.Schema;

const _UserModel = new mongoose.Schema({
    _id: String,
    username: {type: String, required: true}, 
    password: {type: String, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    favPaymentMethod: {
        type: String,
        enum : ['carta','alla consegna'],
        required: false
    },
    address: {type: String, required: false},
    loyaltyPoints: {type: Number, default: 0},
    lastVisit: {type: Date, default: Date.now},
    commentsFromOfficiers: {
        type: String,
        enum : ['bravo cliente','cliente cattivo'],
        required: false
    },
    favCategories:{
        type: [String],
        ref: 'Category'
    },
    favItemsId:{
        type: [String],
        ref: 'Item'
    },
    role: {
        type: String,
        enum : ['cliente','funzionario','manager'],
        default: 'cliente'
    },
    rentals: {
        type: [String],
        ref: 'Rental',
        default: []
    }
}, { collection: "User"});

_UserModel.pre('save', function (next) {
    const user = this;
    if (!user._id)
        user._id = uniqid('id-');
    user.password = bcrypt.hashSync(user.password, auth.saltRounds);
    next();
});

const UserModel = mongoose.model('User', _UserModel)

/*
UserModel.getById = async (id) => {
    const user = await UserModel.findById(id).select("-password -__v");
    return user
}


UserModel.getAuthToken = async (username, clearTextPassword) => {
    const user = await UserModel.findOne({username: username});

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw UnauthorizedError;

    const payload = { type:'user', user: _.omit(user, ['password', '__v'])}
    const token = jwt.sign(payload, process.env.JWT_SECRET).toString();
    return token;
}
*/

module.exports = UserModel