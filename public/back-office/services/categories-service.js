function createCategory(name, description) {
    return httpPost('categories', {name, description}, true);
}

function getCategories() {
    return httpGet('categories', true);
}

function getCategoryById(id) {
    return httpGet('categories/'+id, true);
}

function deleteCategory(id) {
    return httpDelete('categories/'+id, true);
}

function editCategory(_id, name, description) {
    return httpPut('categories', {_id, name, description}, true);
}