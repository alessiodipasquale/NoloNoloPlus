const mongoose =require('mongoose');
const seed = require('../database/seed');
const User = require('../models/User')

const initialize = async () => {
    console.log("Inizializzo database, DB_URI: "+process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI);
    if (global.config.seed) await seed()
}

module.exports = { 
    initialize,
};