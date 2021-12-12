function createGroup(items, name) {
    return httpPost('groups', {items, name}, true);
}

function getGroups() {
    return httpGet('groups', false);
}

function getGroupById(id) {
    return httpGet('groups/'+id, true);
}

function deleteGroup(id) {
    return httpDelete('groups/'+id, true);
}

function editGroup(_id, items, name ) {
    return httpPut('groups', {_id, items, name}, true);
}