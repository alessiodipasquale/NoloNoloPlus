const mongoose =require('mongoose');
const seed = require('../database/seed');
const UserModel = require('../models/UserModel');
const { editCategory } = require("../routes/Category");

const initialize = async () => {
    console.log("Initializing database, DB_URI: " + process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI);
    if (global.config.seed) await seed();
}

module.exports = { 
    initialize,
};