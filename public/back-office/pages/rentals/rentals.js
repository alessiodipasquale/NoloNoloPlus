var choice;
var userId;
var itemId;
var state;
var price;
$(document).ready(function() {
    loadAllItems();
});

function loadAllItems() {
    $('tbody').empty();
    getRentals()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });
}

function openEditRental(elem) {
    getRentalById(elem.target.id)
    .done(rental => {
        console.log(rental)
    })
}

function openCreateRental() {
    $('.objectKitSelection').show();
    $('.createItemRental').hide();
    $('.createKitRental').hide();
    $('.modal-footer').hide();
    $('#alertAvailable').hide();
    $('.price').hide();
    $('#createRentalModal').modal('show')

}

function verifyAvailability() {
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    if(itemId && startDate && endDate) {
        checkIfAvailables(itemId, startDate, endDate)
        .done(() => {
            $('#alertAvailable').show();
            calculatePriceforItem(itemId, startDate, endDate)
            .done(res => {
                price = res.finalPrice
                $('.price').show();
                const row = $('<div style="display: flex; justify-content: space-evenly; margin: 3%"></div>');
                const h3 = $('<h3></h3>').text('Il prezzo finale calcolato è: ');
                const input = $('<input type="number" class="form-control" id="finalPrice" style="height:1%; width: 50%">').val(res.finalPrice)
                row.append([h3, input]);
                $('.price').append(row);

                for (elem of res.receipt) {
                    $('.price').append($('<p></p>').text(elem))
                }
                
                $('#verifyBtn').hide();
                $('#createBtn').show();

            })
        }).catch(err => {
            alert("Date non disponibili.")
        })

    } else {
        alert("Inserisci tutti i campi.")
    }
}

function setChoice() {
    choice = $("input[name='objectKitSelection']:checked").val();
    $('.objectKitSelection').hide();
    

    if (choice == "singolo"){
        setUserDropdown();
        setItemDropdown();
        $('.createItemRental').show();
        $('#createBtn').hide();
        $('.modal-footer').show();
    }else {
        $('.createKitRental').show();
        $('.modal-footer').show();
    }
    
}

function setUserDropdown(){
    getUsers()
    .done(users => {
        for (elem of users){
            const user = $('<li class="elementDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getUserById(elem.target.id)
                .done(res => {
                    userId = res._id
                    $('#clientSearchButton').text(res.name+' '+res.surname);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+' '+elem.surname+', ruolo: '+elem.role);
            user.append(link);
            $('#dropdown-users').append(user);
        }
    })

    $(document).ready(function(){
        $("#userFilter").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".dropdown-menu li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}

function setItemDropdown() {
    getItems()
    .done(res => {
        for (const elem of res) {
            const item = $('<li class="elementEditDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getItemById(elem.target.id)
                .done(res => {
                    itemId = res._id
                    $('#itemSearchButton').text(res.name);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+', Stato:'+elem.state)
            item.append(link);
            $('#dropdown-items').append(item);
        }

        $(document).ready(function(){
            $("#itemFilter").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".dropdown-menu li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
            });

    })
}

function setState(stat) {
    state = stat;
    $('#inputState').text(state);
}

function addElemToTable(elem) {
    console.log(elem);
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.clientId);
    var row3 = $('<td></td>').text(elem.rentalTarget == "singolo" ? elem.itemId : elem.kitId);
    var row4 = $('<td></td>').text(new Date(elem.startDate).toLocaleDateString());
    var row5 = $('<td></td>').text(new Date(elem.endDate).toLocaleDateString());
    var row6 = $('<td></td>').text(elem.state);
    var row7 = $('<td></td>').text(elem.finalPrice);
    var row8 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        openEditRental(elem);
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteRental(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    row8.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5, row6, row7, row8]);
    $('tbody').append(row);
}

function createRent() {
    console.log('creo');
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    var modifyPrice = $('#finalPrice').val();
    if (price == modifyPrice) 
        modifyPrice = undefined
    if(userId && itemId && state && startDate && endDate) {
        createRental(startDate, endDate, [itemId], undefined, state, userId, modifyPrice)
        .done(() => {
            $('#createRentalModal').modal('hide')
        })
    } else {
        alert("Inserisci tutti i campi.")
    }
}