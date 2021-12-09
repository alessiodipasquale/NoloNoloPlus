function createRental(startDate, endDate, itemIds, kitId) { //kitId can be null
    return httpPost('rentals', {startDate, endDate, itemIds, kitId}, true);
}

function getRentals() {
    return httpGet('rentals', false);
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