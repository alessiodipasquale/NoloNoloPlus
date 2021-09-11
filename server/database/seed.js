const { User, Item } = require('./models');
const { users, items } = require('./data');
const seed = async() => {
    console.log("Seeding...")
    const usersCount = await User.collection.countDocuments({});
    if( usersCount !== 0) User.collection.drop();
    const Users = [];
    for (let u of users) 
        Users.push(User.create(u));

    const itemsCount = await Item.collection.countDocuments({});
    if(itemsCount !== 0) Item.collection.drop();
    const Items = [];
    for (let i of items)
        Items.push(Item.create(i));
}

module.exports = seed;