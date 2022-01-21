$(document).ready(function() {
    getCategories()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });
});


function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.description);
    var row4 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getCategoryById(elem.target.id)
        .done(category => {
            $('#inputEditId').val(category._id)
            $('#inputEditName').val(category.name)
            $('#inputEditDescription').val(category.description)
            $('#editCategoryModal').modal('show')
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

    row4.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4]);
    $('tbody').append(row);
}

function create() {
    const name = $('#inputName').val();
    const description = $('#inputDescription').val();
    if(name=='' || description == '') {
        alert('Inserisci tutti i campi.')
    } else {
        createCategory(name, description)
        .done((res)=> {
            addElemToTable(res);
            $('#createCategoryModal').modal('hide')
        }).catch(err => alert("Errore nella creazione della categoria."))
    }
}

function edit() {
    const id = $('#inputEditId').val();
    const name = $('#inputEditName').val();
    const description = $('#inputEditDescription').val();
    if(name == '' || description == '') {
        alert('Inserisci tutti i campi.')
    } else {
        editCategory(id, name, description)
        .done(res => {
            $('#editCategoryModal').modal('hide')
        }).catch(err => alert("Errore nella modifica della categoria."))
    }
}