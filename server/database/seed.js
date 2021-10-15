const { UserModel, ItemModel, CategoryModel, CertificationModel, PriceDetailsModel, PropertyModel, RentalModel } = require('./models');
const { users, items, categories, certifications, priceDetails, properties, rentals } = require('./data');
const seed = async() => {
    console.log("Seeding...")
    
    // User
    const usersCount = await UserModel.collection.countDocuments({});
    if( usersCount !== 0) UserModel.collection.drop();
    const Users = [];
    for (let u of users) 
        Users.push(await UserModel.create(u));

    // Item
    const itemsCount = await ItemModel.collection.countDocuments({});
    if(itemsCount !== 0) ItemModel.collection.drop();
    const Items = [];
    for (let i of items)
        Items.push(await ItemModel.create(i));
    
    // Category
    const categoriesCount = await CategoryModel.collection.countDocuments({});
    if( categoriesCount !== 0) CategoryModel.collection.drop();
    const Categories = [];
    for (let c of categories) 
        Categories.push(await CategoryModel.create(c));
    
    // Certification
    const certificationsCount = await CertificationModel.collection.countDocuments({});
    if( certificationsCount !== 0) CertificationModel.collection.drop();
    const Certifications = [];
    for (let cert of certifications) 
        Certifications.push(await CertificationModel.create(cert));
    
    // PriceDetails
    const pdCount = await PriceDetailsModel.collection.countDocuments({});
    if( pdCount !== 0) PriceDetailsModel.collection.drop();
    const Pds = [];
    for (let p of priceDetails) 
        Pds.push(await PriceDetailsModel.create(p));
    
    // Property
    const propertiesCount = await PropertyModel.collection.countDocuments({});
    if( propertiesCount !== 0) PropertyModel.collection.drop();
    const Properties = [];
    for (let prop of properties) 
        Properties.push(await PropertyModel.create(prop));
    
    // Rental
    const rentalsCount = await RentalModel.collection.countDocuments({});
    if( rentalsCount !== 0) RentalModel.collection.drop();
    const Rentals = [];
    for (let u of rentals) 
        Rentals.push(await RentalModel.create(u));
}

module.exports = seed;