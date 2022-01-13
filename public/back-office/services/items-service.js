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

function editItem(_id, name, description, standardPrice, imgSrc, category, kits, state, groupId) {
    return httpPut('items/'+_id, {name, description, standardPrice, imgSrc, category, kits, state, groupId}, true);
}