$(document).ready(function() {
    getUsers()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });

    $('#dropdown-payement a').click(function () {           
        $('#inputPayementMethod').text($(this).text());
    });

    $('#dropdown-role a').click(function () {           
        $('#inputRole').text($(this).text());
    });
});

function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.surname);
    var row4 = $('<td></td>').text(elem.username);
    var row5 = $('<td></td>').text(elem.role);
    var row6 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    var editIcon = $('')
    editBtn.click(function (elem) {
        console.log(elem.target)
        getUserById(elem.target.id)
        .done(user => {
            console.log(user);
            $('#inputEditId').val(user._id)
            $('#inputEditName').val(user.name)
            $('#inputEditSurname').val(user.surname)
            $('#inputEditUsername').val(user.username)
            $('#inputEditAddress').val(user.address)
            $('#inputEditLoyaltyPoint').val(user.loyaltyPoints)
            $('#inputEditLastVisit').val(new Date(user.lastVisit).toISOString().substr(0, 10))
            $('#inputEditPayementMethod').text(user.favPaymentMethod);
            $('#inputEditRole').text(user.role);
            $('#editUserModal').modal('show')
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteUser(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    row6.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5,row6]);
    $('tbody').append(row);
}

function show(elem) {
    console.log(elem)
}

function create() {
    const name = $('#inputName').val();
    const surname = $('#inputSurname').val();
    const username = $('#inputUsername').val();
    const password = $('#inputPassword').val();
    const address = $('#inputAddress').val() !== '' ? $('#inputAddress').val() : null;
    const loyaltyPoints = $('#inputLoyaltyPoint').val() !== '' ? $('#inputLoyaltyPoint').val() : null;
    const lastVisit = $('#inputLastVisit').val() !== '' ? $('#inputLastVisit').val() : null;
    const role = $('#inputRole').text() !== '' ? $('#inputRole').text() : null;
    const favPaymentMethod = $('#inputPayementMethod').text() !== '' ? $('#inputPayementMethod').text() : null;
    if(name=='' || surname == '' || username == '' || password == '') {
        alert('Inserisci tutti i campi.')
    } else {
        createUser(name, surname, username, password, address, loyaltyPoints, lastVisit, role, favPaymentMethod)
        .done((res)=> {
            addElemToTable(res);
            $('#createUserModal').modal('hide')
        }).catch(err => alert("Errore nella creazione dell'utente."))
    }
}

function edit() {
    const id = $('#inputEditId').val();
    const name = $('#inputEditName').val();
    const surname = $('#inputEditSurname').val();
    const username = $('#inputEditUsername').val();
    const address = $('#inputEditAddress').val() !== '' ? $('#inputEditAddress').val() : null;
    const loyaltyPoints = $('#inputEditLoyaltyPoint').val() !== '' ? $('#inputEditLoyaltyPoint').val() : null;
    const lastVisit = $('#inputEditLastVisit').val() !== '' ? $('#inputEditLastVisit').val() : null;
    const role = $('#inputEditRole').text() !== '' ? $('#inputEditRole').text() : null;
    const favPaymentMethod = $('#inputEditPayementMethod').text() !== '' ? $('#inputEditPayementMethod').text() : null;
    if(name=='' || surname == '' || username == '') {
        alert('Inserisci tutti i campi.')
    } else {
        editUser(id, name, surname, username, address, loyaltyPoints, lastVisit, role, favPaymentMethod)
        .done((res)=> {
            //editElemInTable(res);
            $('#editUserModal').modal('hide')
        }).catch(err => alert("Errore nella modifica dell'utente."))
    }
}