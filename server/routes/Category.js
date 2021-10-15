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

module.exports = {
    getCategories,
    getCategoryById,
    deleteCategory
}