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