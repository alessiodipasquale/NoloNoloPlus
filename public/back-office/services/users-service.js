function createUser(name, surname, username, password) {
    return httpPost('users', {name, surname, username, password}, true);
}