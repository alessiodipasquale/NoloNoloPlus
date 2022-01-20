function createItem(name, description, standardPrice, imgSrc,category, kits, state, groupId, propertiesList) {
    return httpPost('items', {name, description, standardPrice, category, state, imgSrc, kits, groupId, propertiesList}, true);
}

function getItems() {
    return httpGet('items', true);
}

function getItemById(id) {
    return httpGet('items/'+id, true);
}

function deleteItem(id) {
    return httpDelete('items/'+id, true);
}

function editItem(_id, name, description, standardPrice, imgSrc, category, kits, state, groupId, propertiesList) {
    return httpPut('items/'+_id, {name, description, standardPrice, imgSrc, category, kits, state, groupId, propertiesList}, true);
}

function checkIfAvailables(objectId, startDate, endDate) {
    return httpPost('items/'+objectId+'/checkIfAvailable', {startDate, endDate, objectId}, true)
}

function calculatePriceforItem(itemId, startDate, endDate) {
    return httpPost('items/'+itemId+'/calculatePrice', {startDate, endDate}, true)
}