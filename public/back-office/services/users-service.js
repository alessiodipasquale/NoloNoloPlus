function createUser(name, surname, username, password, address, loyaltyPoints, lastVisit, role, favPaymentMethod) {
    return httpPost('users', {name, surname, username, password, address, loyaltyPoints, lastVisit, role, favPaymentMethod}, true);
}

function getUsers() {
    return httpGet('users', true);
}

function deleteUser(id) {
    return httpDelete('users/'+id, true);
}