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

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory,
    findCategoryByName,
    createCategory
}