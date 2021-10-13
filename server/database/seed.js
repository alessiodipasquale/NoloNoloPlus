const { UserModel, ItemModel } = require('./models');
const { users, items } = require('./data');
const seed = async() => {
    console.log("Seeding...")
    const usersCount = await UserModel.collection.countDocuments({});
    if( usersCount !== 0) UserModel.collection.drop();
    const Users = [];
    for (let u of users) 
        Users.push(UserModel.create(u));

    const itemsCount = await ItemModel.collection.countDocuments({});
    if(itemsCount !== 0) ItemModel.collection.drop();
    const Items = [];
    for (let i of items)
        Items.push(ItemModel.create(i));
}

module.exports = seed;