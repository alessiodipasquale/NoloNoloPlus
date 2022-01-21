var type;
var rentalId;
var employerId;

$(document).ready(function() {
    loadAllCertifications()
});

function loadAllCertifications() {
    $('tbody').empty();
    getCertifications()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });
}

function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.rentalId.toString());
    var row3 = $('<td></td>').text(elem.employerId.toString());
    var row4 = $('<td></td>').text(elem.certificationType);
    var row5 = $('<td></td>').text(new Date(elem.certificationDate).toLocaleDateString());
    var row7 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getCertificationById(elem.target.id)
        .done(certification => {
            console.log(certification)
        })
    })

    /*var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteCertification(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })*/

    row7.append([/*openBtn,*/ editBtn, /*deleteBtn*/]);
            
    row.append([row1, row2, row3, row4, row5, row7]);
    $('tbody').append(row);
}
function openCreateCertification() {
    $('#dropdown-rentals').find('*').not('#rentalFilter').remove();
    $('#dropdown-users').find('*').not('#userFilter').remove();
    getRentals()
    .done(rentals => {
        for (elem of rentals) {
            const rent = $('<li class="elementDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getRentalById(elem.target.id)
                .done(res => {
                    rentalId = res._id
                    $('#rentalsSearchButton').text(res._id);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+ (elem.kitId ? elem.kitId : elem.itemId)+', '+new Date(elem.startDate).toLocaleDateString()+', '+new Date(elem.endDate).toLocaleDateString()+', '+elem.state);
            rent.append(link);
            $('#dropdown-rentals').append(rent);
        }
    })

    getAuthorizedUsers()
    .done(users => {
        for (elem of users) {
            const user = $('<li class="elementDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getUserById(elem.target.id)
                .done(res => {
                    employerId = res._id
                    $('#clientSearchButton').text(res.name+' '+res.surname);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+' '+elem.surname+', ruolo: '+elem.role);
            user.append(link);
            $('#dropdown-users').append(user);
        }
    })

    setUpFiterRental();
    setUpFilterUser();

    $('#createCertificationModal').modal('show')


}

function setUpFiterRental() {
    $(document).ready(function(){
        $("#rentalFilter").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}


function setUpFilterUser() {
    $(document).ready(function(){
        $("#userFilter").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}

function setType(ty) {
    type = ty;
    $('#inputType').text(type);
}

function create() {
    const commentsFromEmployer =  $('#inputComment').val() !== "" ? $('#inputComment').val() : undefined;

    if(!type || !rentalId || !employerId) {
        alert("Inserisci tutti i campi.")
    } else {
        createCertification(rentalId, employerId, type, commentsFromEmployer)
        .done(() => {
            loadAllCertifications();
            $('#createCertificationModal').modal('hide')
        }).catch(err => alert("Errore nella creazione."));
    }
}
