$(document).ready(function() {
    getProperties()
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
    var row1 = $('<td name="id"></td>').text(elem._id);
    var row2 = $('<td name="name"></td>').text(elem.name);
    var row3 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getPropertyById(elem.target.id)
        .done(prop => {
            $('#inputEditId').val(prop._id)
            $('#inputEditName').val(prop.name)
            $('#editPropertyModal').modal('show')
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteProperty(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    editBtn.attr("aria-label", "pulsante di modifica")
    deleteBtn.attr("aria-label", "pulsante di eliminazione")

    row3.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3]);
    $('tbody').append(row);
}

function create() {
    const name = $('#inputName').val();
    createProperty(name)
    .done(res => {
        addElemToTable(res);
        $('#createPropertyModal').modal('hide')
    }).catch(err => alert("Errore nella creazione della propriet??."))
}

function edit() {
    const id = $('#inputEditId').val();
    const name = $('#inputEditName').val();
    editProperty(id,name)
    .done(res => {
        //modifica nella tabella
        const row = $('#'+res._id);
        row.children('td[name="name"]').text(res.name);
        $('#editPropertyModal').modal('hide')
    }).catch(err => alert("Errore nella modifica della propriet??."))
}