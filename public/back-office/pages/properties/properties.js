$(document).ready(function() {
    getProperties()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });
});


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
        console.log(elem.target)
        getPropertyById(elem.target.id)
        .done(prop => {
            console.log(prop);
            $('#inputEditId').val(prop._id)
            $('#inputEditName').val(prop.name)
            $('#editPropertyModal').modal('show')
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteCategory(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    row3.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3]);
    $('tbody').append(row);
}

function create() {
    const name = $('#inputName').val();
    console.log(name);
    createProperty(name)
    .done(res => {
        console.log(res);
        addElemToTable(res);
        $('#createPropertyModal').modal('hide')
    }).catch(err => alert("Errore nella creazione della proprietà."))
}

function edit() {
    const id = $('#inputEditId').val();
    const name = $('#inputEditName').val();
    editProperty(id,name)
    .done(res => {
        console.log(res);
        //modifica nella tabella NON TORNA FAI RETURN
        const row = $('#'+res._id);
        console.log($('#'+res._id))
        $('#editPropertyModal').modal('hide')
    }).catch(err => alert("Errore nella modifica della proprietà."))
}