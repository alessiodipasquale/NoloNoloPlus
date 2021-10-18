const RentalModel = require("../models/RentalModel");
const { getItemById, updateItemRentalDates } = require("../routes/Item"); 
const { UnauthorizedError, BadRequestError, AlreadyExistsError } = require('../config/errors');
const { getDatesFromARange } = require("../utils/UtilityFuctions");

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
    if(!object.startDate || !object.itemIds || !object.endDate || !object.timeInDays|| !object.clientId || !object.employerId || !object.rentalType)
        throw BadRequestError;
    
    if(!checkIfAvailable(object))
        throw BadRequestError;

    const rental = await RentalModel.create(object);
    const dates = getDatesFromARange(object.startDate, object.endDate);
    updateItemRentalDates("add", dates, itemIds)
    return rental;
}

const checkIfAvailable = async (object) => {
    if(!object.startDate || !object.endDate || !object.ids)
        throw BadRequestError;

    var isOk = true;
    for(var elem of object.ids){
        const item = await getItemById(elem);
        const start = new Date(object.startDate);
        const end = new Date(object.startDate);
        for(let e of item.rentalDates){
            const elem = new Date(e)
            if (elem >= start && elem <= end){
                ok = false;
                break;
            }
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