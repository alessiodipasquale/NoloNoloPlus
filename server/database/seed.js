const { User, Item } = require('./models');
const { users, items } = require('./data');
const mongoose  = require('mongoose');
const seed = async() => {
    console.log("Seeding...")

    User.collection.drop();
    const Users = [];
    for (let u of users) 
        Users.push(User.create(u));

    Item.collection.drop();
    const Items = [];
    for (let i of items)
        Items.push(Item.create(i));
}

module.exports = seed;