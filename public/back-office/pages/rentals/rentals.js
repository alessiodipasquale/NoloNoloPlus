var choice;
var userId;
var itemId;
var kitId;
var price;
var editRentalId;
var editPrice;

$(document).ready(function() {
    loadAllRentals();
    setSearch();
});

function loadAllRentals() {
    $('tbody').empty();
    getRentals()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });
}

function setSearch() {
    $("#searchtext").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function openEditRental(elem) {
    $('.editprice').empty();

    getRentalById(elem.target.id)
    .done(rental => {
        editRentalId = rental._id;
        editPrice = rental.finalPrice;
        $('#clientId').val(rental.clientId)
        $('#employeeId').val(rental.employeeId)
        if (rental.kitId) {
            $('#itemOrKitLabel').text("Id Kit");
            $('#itemOrKitId').val(rental.kitId);
        } else {
            $('#itemOrKitLabel').text("Id Oggetto");
            $('#itemOrKitId').val(rental.itemId);
        }
        $('#startEditDate').val(new Date(rental.startDate).toISOString().substring(0,10));
        $('#endEditDate').val(new Date(rental.endDate).toISOString().substring(0,10));
        $('#finalEditPrice').val(rental.finalPrice);
        $('#editNotes').val(rental.notes);
        //NOTE COME TESTO SINGOLO DA AGGIUNGERE

        if(rental.kitId) {
            for (elem of rental.receipt) {
                $('.editprice').append($('<p></p>').text(elem))
            }
            $('.editprice').append($('<br></br>'));

            for (elem of rental.partialPrices) {
                for (e of elem)
                    $('.editprice').append($('<p></p>').text(e))
                $('.editprice').append($('<br></br>'));
            }
        } else {
            for (elem of rental.receipt) {
                $('.editprice').append($('<p></p>').text(elem))
            }
        }

        $('#editRentalModal').modal('show')

    })
}

function openCreateRental() {
    $('.objectKitSelection').show();
    $('.createItemRental').hide();
    $('.createKitRental').hide();
    $('.modal-footer').hide();
    $('#alertAvailable').hide();
    $('.price').hide();

    $('#dropdown-items').find('*').not('#itemFilter').remove();
    $('#dropdown-users').find('*').not('#userFilter').remove();
    $('#dropdown-kitusers').find('*').not('#userKitFilter').remove();
    $('#dropdown-kits').find('*').not('#kitFilter').remove();


    $('#createRentalModal').modal('show')

}

function verifyAvailability() {
    
    if (choice == "singolo") {
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
    } else {
        const startDate = $('#startKitDate').val();
        const endDate = $('#endKitDate').val();
        if(kitId && startDate && endDate) {
            checkIfKitAvailables(kitId, startDate, endDate)
            .done(() => {
                $('#alertAvailable').show();
                calculatePriceforKit(kitId, startDate, endDate)
                .done(res => {
                    price = res.finalKitPrice
                    $('.price').show();
                    const row = $('<div style="display: flex; justify-content: space-evenly; margin: 3%"></div>');
                    const h3 = $('<h3></h3>').text('Il prezzo finale calcolato è: ');
                    const input = $('<input type="number" class="form-control" id="finalKitPrice" style="height:1%; width: 50%">').val(res.finalKitPrice)
                    row.append([h3, input]);
                    $('.price').append(row);
    
                    for (elem of res.kitReceipt) {
                        $('.price').append($('<p></p>').text(elem))
                    }

                    for (elem of res.partialPrices) {
                        for (e of elem)
                            $('.price').append($('<p></p>').text(e))
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
    
}

function setChoice() {
    choice = $("input[name='objectKitSelection']:checked").val();
    $('.objectKitSelection').hide();
    

    if (choice == "singolo"){
        $('.createItemRental').show();
        setUserDropdown();
        setItemDropdown();
        $('#verifyBtn').show();
        $('#createBtn').hide();
        $('.modal-footer').show();
    }else {
        $('.createKitRental').show();
        setUserKitDropdown();
        setKitsDropdown();
        $('#verifyBtn').show();
        $('#createBtn').hide();
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


function setUserKitDropdown(){
    getUsers()
    .done(users => {
        for (elem of users){
            const user = $('<li class="elementDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getUserById(elem.target.id)
                .done(res => {
                    userId = res._id
                    $('#clientSearchButtonKit').text(res.name+' '+res.surname);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+' '+elem.surname+', ruolo: '+elem.role);
            user.append(link);
            $('#dropdown-kitusers').append(user);
        }
    })

    $(document).ready(function(){
        $("#userKitFilter").on("keyup", function() {
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

function setKitsDropdown() {
    getKits()
    .done(res => {
        for (const elem of res) {
            const item = $('<li class="elementEditDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
            .click(function(elem) {
                getKitById(elem.target.id)
                .done(res => {
                    kitId = res._id
                    $('#kitSearchButton').text(res.name);
                })
            })
            const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name)
            item.append(link);
            $('#dropdown-kits').append(item);
        }

        $(document).ready(function(){
            $("#kitFilter").on("keyup", function() {
                var value = $(this).val().toLowerCase();
                $(".dropdown-menu li").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });
            });

    })
}



function addElemToTable(elem) {
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
    editBtn.attr("aria-label", "pulsante di modifica")
    deleteBtn.attr("aria-label", "pulsante di eliminazione")

    row8.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5, row6, row7, row8]);
    $('tbody').append(row);
}

function createRent() {
    const startDate = choice == "singolo" ? $('#startDate').val() : $('#startKitDate').val();
    const endDate =  choice == "singolo" ? $('#endDate').val() :$('#endKitDate').val() ;
    var modifyPrice = choice == "singolo" ? $('#finalPrice').val() : $('#finalKitPrice').val();
    if (price == modifyPrice) 
        modifyPrice = undefined
    if(userId && (itemId || kitId) && startDate && endDate) {
        if (choice == "singolo") {
            createRental(startDate, endDate,itemId, undefined, userId, modifyPrice)
            .done(() => {
                loadAllRentals();
                $('#createRentalModal').modal('hide')
            })
        } else {
            createRental(startDate, endDate,undefined, kitId, userId, modifyPrice)
            .done(() => {
                loadAllRentals();
                $('#createRentalModal').modal('hide')
            })
        }
        
    } else {
        alert("Inserisci tutti i campi.")
    }
    
}

function editRent() {
    var modifyPrice =  $('#finalEditPrice').val();
    if (editPrice == modifyPrice) 
        modifyPrice = undefined

    var notes =  $('#editNotes').val();

    editRental(editRentalId, notes, modifyPrice)
    .done(() => {
        loadAllRentals();
        $('#editRentalModal').modal('hide')
    })
}