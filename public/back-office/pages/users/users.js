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

    var editBtn = $('<button type="button" class="btn btn-success mr-3" id='+elem._id+'><i class="fas fa-edit"></i></button>')

    editBtn.click(function (elem) {
        console.log(elem.target.id);
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id='+elem._id+'><i class="far fa-trash-alt"></i></button>')
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