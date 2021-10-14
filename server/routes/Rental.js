const RentalModel = require("../models/RentalModel");

const getRentalById = async (req,res) => {
    try {
        const rental = await RentalModel.findById(req.params.id)
        res.send(rental);
    } catch (err) {
        res.handle(err);
    }
}

const getRentals = async (req,res) => {
    try {
        const rentals =  await RentalModel.find();
        res.send(rentals);
    } catch (err) {
        res.handle(err);
    }
}

const deleteRental = async (req,res) => {
    try {
        const rental = await RentalModel.deleteOne({_id: req.params.id})
        res.send();
    } catch (err) {
        res.handle(err);
    }
}

module.exports = {
    getRentals,
    getRentalById,
    deleteRental
}