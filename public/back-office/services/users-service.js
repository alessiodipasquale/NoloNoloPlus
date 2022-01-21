function createUser(name, surname, username, password, address, loyaltyPoints, lastVisit, role, favPaymentMethod) {
    return httpPost('users', {name, surname, username, password, address, loyaltyPoints, lastVisit, role, favPaymentMethod}, true);
}

function getUsers() {
    return httpGet('users', true);
}

function getAuthorizedUsers() {
    //staff
    return httpGet('users/staff', true);
}

function getUserById(id) {
    return httpGet('users/'+id, true);
}

function deleteUser(id) {
    return httpDelete('users/'+id, true);
}

function editUser(_id, name, surname, username, address, loyaltyPoints, lastVisit, role, favPaymentMethod) {
    return httpPut('users', {_id, name, surname, username, address, loyaltyPoints, lastVisit, role, favPaymentMethod}, true);
}