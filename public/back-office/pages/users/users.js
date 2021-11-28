function create() {
    const name = $('#inputName').val();
    const surname = $('#inputSurname').val();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();
    if(name=='' || surname == '' || username == '' || password == '') {
        alert('Inserisci tutti i campi.')
    } else {
        console.log('arrivo');
        createUser(name, surname, username, password)
        .done((res)=> {
            $('#createUserModal').modal('hide')
        }).catch(err => alert("Errore nella creazione dell'utente."))
    }
}