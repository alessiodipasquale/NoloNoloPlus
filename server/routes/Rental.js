const RentalModel = require("../models/RentalModel");
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')


const getRentalById = async (id) => {
    const rental = await RentalModel.findById(id)
    return rental;
}

const getRentals = async (req,res) => {
    const rentals =  await RentalModel.find();
    return rentals;
}

const deleteRental = async (req,res) => {
    const rental = await RentalModel.deleteOne({_id: id})
    if(!rental)
        throw BadRequestError;
}

module.exports = {
    getRentals,
    getRentalById,
    deleteRental
}