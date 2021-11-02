const CategoryModel = require("../models/CategoryModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getCategoryById = async (id) => {
    const category = await CategoryModel.findById(id)
    return category;
}

const getCategories = async () => {
    const categories =  await CategoryModel.find();
    return categories;
}

const deleteCategory = async (id) => {
    const category = await CategoryModel.deleteOne({_id: id})
    if(!category)
        throw BadRequestError;
}

const findCategoryByName = async (name) => {
    const category = await CategoryModel.findOne({name: name});
    return category;
}

const createCategory = async (object) => {
    if(!object.name || !object.description)
        throw BadRequestError;
        
    if (await findCategoryByName(object.name))
        throw AlreadyExistsError;

    const category = await CategoryModel.create(object);
    return category;
}

const associateToCategory = async (type, toModify, value, catId) => {
    const category = await getCategoryById(catId);
    if(type == "array") {
        let elem = JSON.stringify(category);
        elem = JSON.parse(elem);
        switch (toModify) {
            case "associatedItems": {
                let associatedItems = elem.associatedItems;
                associatedItems.push(value);
                await CategoryModel.updateOne({_id: catId},{ $set: { "associatedItems": associatedItems} });
                break;
            }
        }
    }/* else {

    }*/
}

const editCategory = async (catId, object) => {
    /*username, name, surname, favPaymentMethod (carta, alla consegna), address */
    if(object.name)
        await CategoryModel.updateOne({_id: catId},{ $set: { "name": object.name} });
    if(object.description)
        await CategoryModel.updateOne({_id: catId},{ $set: { "description": object.description} });
    if(object.items){
        const category = await getCategoryById(catId);
        let elem = JSON.stringify(category);
        elem = JSON.parse(elem);
        let oldAssociatedItems = elem.associatedItems;
        //TODO: cascade modify category id into items
        //TODO: modify property associated
        await CategoryModel.updateOne({_id: catId},{ $set: { "associatedItems": object.items} });
    }
    return null;
}

const deleteAssociationToCategory = async (categoryId, toDelete) => {
    const category = await getCategoryById(categoryId);
    let elem = JSON.stringify(category);
    elem = JSON.parse(elem);

    let associatedItems = elem.associatedItems.filter(e => e != toDelete)
    await CategoryModel.updateOne({_id: categoryId},{ $set: { "associatedItems": associatedItems} }); 

    let associatedProperties = elem.associatedProperties.filter(e => e != toDelete)
    await CategoryModel.updateOne({_id: categoryId},{ $set: { "associatedProperties": associatedProperties} }); 
}

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory,
    findCategoryByName,
    createCategory,
    associateToCategory,
    editCategory,
    deleteAssociationToCategory
}