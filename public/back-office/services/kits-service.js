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
    return httpPut('kits', {name, description, standardPrice, available, items}, true);
}