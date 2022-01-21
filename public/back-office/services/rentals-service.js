function createRental(startDate, endDate, objectId, kitId, clientId, modifyPrice) { //kitId can be null
    return httpPost('rentals', {startDate, endDate, objectId, kitId, clientId, modifyPrice}, true);
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

function editRental(_id, notes, modifyPrice) {
    console.log({_id, notes, modifyPrice});
    return httpPut('rentals/'+_id, {_id, notes, modifyPrice}, true);
}