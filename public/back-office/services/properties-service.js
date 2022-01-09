function createProperty(name) {
    return httpPost('properties', {name}, true);
}

function getProperties() {
    return httpGet('properties', false);
}

function getPropertyById(id) {
    return httpGet('properties/'+id, true);
}

function deleteProperty(id) {
    return httpDelete('properties/'+id, true);
}

function editProperty(_id, name) {
    return httpPut('properties/'+_id, {name}, true);
}