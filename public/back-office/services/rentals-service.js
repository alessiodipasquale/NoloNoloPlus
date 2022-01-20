function createRental(startDate, endDate, objectId, kitId, state, clientId, modifyPrice) { //kitId can be null
    return httpPost('rentals', {startDate, endDate, objectId, kitId, state, clientId, modifyPrice}, true);
}

function getRentals() {
    return httpGet('rentals', true);
}

function getRentalById(id) {
    return httpGet('rentals/'+id, true);
}

function deleteRental(id) {
    return httpDelete('rentals/'+id, true);
}

function editRental(_id, startDate, endDate, itemIds, kitId, rentalType, rentalTarget, state, clientId, employerId) {
    return httpPut('rentals', {_id, startDate, endDate, itemIds, kitId, rentalType, rentalTarget, state, clientId, employerId}, true);
}