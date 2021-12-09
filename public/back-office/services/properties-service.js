function createProperty(name, associatedValues) {
    return httpPost('properties', {name, associatedValues}, true);
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

function editProperty(_id, name, associatedValues ) {
    return httpPut('properties', {_id, associatedValues, name}, true);
}