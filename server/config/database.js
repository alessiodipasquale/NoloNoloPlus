const mongoose =require('mongoose');

const User = require('../../models/User')

const initialize = async () => {
    console.log(process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI);

    const user = {
        username: "Alessio",
        password: "ciao",

    }

    const response = await User.create(user);
}

module.exports = { 
    initialize,
};