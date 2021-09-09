const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const { auth } = require('../server/config/params')

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
    const user = await User.findById(id)
    return user.json
}

module.exports = User