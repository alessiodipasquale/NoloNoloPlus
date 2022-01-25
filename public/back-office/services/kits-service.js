function createKit(name, description, standardPrice, items, available) {
    return httpPost('kits', {name, description, standardPrice, items, available}, true);
}

function getKits() {
    return httpGet('kits', false);
}

function getKitById(id) {
    return httpGet('kits/'+id, true);
}

function deleteKit(id) {
    return httpDelete('kits/'+id, true);
}

function editKit(_id, name, description, standardPrice, available, items) {
    return httpPut('kits/'+_id, {name, description, standardPrice, available, items}, true);
}

function checkIfKitAvailables(kitId, startDate, endDate) {
    return httpPost('kits/'+kitId+'/available', {startDate, endDate, kitId}, true)
}

function calculatePriceforKit(kitId, startDate, endDate) {
    return httpPost('kits/'+kitId+'/price', {startDate, endDate}, true)
}