const mongoose =require('mongoose');

const test = new mongoose.Schema({
    name: {type: String}, 
    age: {type: Number},
    date: {type: Number, default: Date.now}
}, { collection: "TestModel"})

const model = mongoose.model('TestModel', test)

module.exports = model