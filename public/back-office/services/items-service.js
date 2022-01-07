function createItem(name, description, standardPrice, imgSrc,category, kits, state) {
    return httpPost('items', {name, description, standardPrice, category, state, imgSrc, kits}, true);
}

function getItems() {
    return httpGet('items', false);
}

function getItemById(id) {
    return httpGet('items/'+id, true);
}

function deleteItem(id) {
    return httpDelete('items/'+id, true);
}

function editItem(_id, name, description) {
    return httpPut('items', {_id, name, description}, true);
}