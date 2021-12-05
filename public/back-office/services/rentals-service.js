function createrental(startDate, endDate, itemIds, kitId) { //kitId can be null
    return httpPost('rentals', {startDate, endDate, itemIds, kitId}, true);
}

function getrentals() {
    return httpGet('rentals', false);
}

function getrentalById(id) {
    return httpGet('rentals/'+id, true);
}

function deleterental(id) {
    return httpDelete('rentals/'+id, true);
}

function editrental(_id, startDate, endDate, itemIds, kitId, rentalType, rentalTarget, state, clientId, employerId) {
    return httpPut('rentals', {_id, startDate, endDate, itemIds, kitId, rentalType, rentalTarget, state, clientId, employerId}, true);
}