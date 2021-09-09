const mongoose =require('mongoose');

const Test = require('../../models/test')

const initialize = async () => {
    console.log(process.env.DB_URI)
    await mongoose.connect(process.env.DB_URI);

    const ao = {
        name: "Alessio",
        age: 20
    }

    const response = await Test.create(ao);
}

module.exports = { 
    initialize,
};