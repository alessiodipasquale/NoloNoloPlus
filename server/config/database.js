const mongoose =require('mongoose');

const initialize = async () => {
    console.log(process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI);
}

module.exports = { 
    initialize,
};