$(document).ready(function() {
    getPropertyValues()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });

    setSearch();
});

function setSearch() {
    $("#searchtext").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}


function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.value);
    var row3 = $('<td></td>').text(elem.associatedProperty);
    var row4 = $('<td></td>').text(elem.unitOfMeasure);
    var row5 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getPropertyValueById(elem.target.id)
        .done(propertyValue => {
            $('#inputEditId').val(propertyValue._id)
            $('#inputEditValue').val(propertyValue.value)
            $('#inputEditDescription').val(propertyValue.unitOfMeasure)
            $('#editPropertyValueModal').modal('show')
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deletePropertyValue(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    editBtn.attr("aria-label", "pulsante di modifica")
    deleteBtn.attr("aria-label", "pulsante di eliminazione")

    row5.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5]);
    $('tbody').append(row);
}

function create() {

}

function edit() {

}