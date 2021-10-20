const RentalModel = require("../models/RentalModel");
const { getItemById } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors')

const getRentalById = async (id) => {
    const rental = await RentalModel.findById(id)
    return rental;
}

const getRentals = async () => {
    const rentals =  await RentalModel.find();
    return rentals;
}

const deleteRental = async () => {
    const rental = await RentalModel.deleteOne({_id: id})
    if(!rental)
        throw BadRequestError;
}

const createRental = async (object) => {
    if(!object.startDate || !object.endDate || !object.timeInDays|| !object.clientId /*|| !object.employerId*/ || !object.rentalType)
        throw BadRequestError;
    
    if(!checkIfAvailable(object))
        throw BadRequestError;

    const rental = await RentalModel.create(object);
    //updateItemRentalDates("add", dates)
    return rental;
}

const checkIfAvailable = async (object) => {
    if(!object.startDate || !object.endDate || !object.id)
        throw BadRequestError;

    const item = await getItemById(object.id);
    const start = new Date(object.startDate);
    const end = new Date(object.endDate);
    var isOk = true;
    for(let e of item.rentalDates){
        const elem = new Date(e)
        if (elem >= start && elem <= end){
            ok = false;
            break;
        }
    }
    return isOk;
}

module.exports = {
    getRentals,
    getRentalById,
    createRental,
    deleteRental
}