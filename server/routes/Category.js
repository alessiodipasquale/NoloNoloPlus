const CategoryModel = require("../models/CategoryModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const {associateToItem, deleteAssociationToItem}  = require("./associations/AssociationManager");


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

const editCategory = async (catId, object) => {
    if(object.name)
        await CategoryModel.updateOne({_id: catId},{ $set: { "name": object.name} });
    if(object.description)
        await CategoryModel.updateOne({_id: catId},{ $set: { "description": object.description} });
    if(object.items){
        const category = await getCategoryById(catId);
        let elem = JSON.stringify(category);
        elem = JSON.parse(elem);
        let oldAssociatedItems = elem.associatedItems;
        let toRemove = oldAssociatedItems.filter(x => !object.items.includes(x));
        let toAdd = object.items.filter(x => !oldAssociatedItems.includes(x));
        for(let elem of toRemove){
            deleteAssociationToItem(elem,catId)
        }
        for(let elem of toAdd){
            associateToItem("array", "category", catId, elem);
        }
        await CategoryModel.updateOne({_id: catId},{ $set: { "associatedItems": object.items} });
    }
    return null;
}

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory,
    findCategoryByName,
    createCategory,
    editCategory,
}