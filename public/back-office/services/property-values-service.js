function createPropertyValue(name, associatedProperty, value, associatedItems,unitOfMeasure) {   //unitOfMeasure can be null
    return httpPost('propertyValues', {name, associatedProperty, value, unitOfMeasure, associatedItems}, true);
}

function getPropertyValues() {
    return httpGet('propertyValues', false);
}

function getPropertyValueById(id) {
    return httpGet('propertyValues/'+id, true);
}

function deletePropertyValue(id) {
    return httpDelete('propertyValues/'+id, true);
}

function editPropertyValue(_id, name, associatedProperty, value, unitOfMeasure, associatedItems ) {
    return httpPut('propertyValues', {_id, name, associatedProperty, value, unitOfMeasure, associatedItems}, true);
}