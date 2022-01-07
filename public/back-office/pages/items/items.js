$(document).ready(function() {
    getItems()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });


});

function openCreateItem() {
    getCategories()
    .done(res => {
        console.log(res);
        for (const category of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`);
            const input = $('<input type="checkbox" class="form-check-input" name="categorySelected">').attr("id",category._id);
            console.log(input.attr("id"));
            const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(category.name);
            a.append(input);
            a.append(label);
          $('#dropdown-category').append(a)
        }
    })

    getKits()
    .done(res => {
        console.log(res);
        for (const kit of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`);
            const input = $('<input type="checkbox" class="form-check-input" name="categorySelected">').attr("id",kit._id);
            console.log(input.attr("id"));
            const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(kit.name);
            a.append(input);
            a.append(label);
          $('#dropdown-kits').append(a)
        }
    }) 

    
    $('#createItemModal').modal('show')
}

function createItem() {
    const categorySelectedEl = $('input[name="categorySelected"]')
    const kitSelected = $('input[name="kitSelected"]')

    var categoriesIds = [];
    var kitsIds = [];

    for(const category of categorySelectedEl) {
        if(category.checked)
            categoriesIds.push(category.id)
    }

    for(const kit of kitSelected) {
        if(kit.checked)
            kitSelected.push(kit.id)
    }
    
    
    
}

function addElemToTable(elem) {
    console.log(elem);
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.description);
    var row4 = $('<td></td>').text(elem.category.toString());
    var row5 = $('<td></td>').text(elem.state);
    var row6 = $('<td></td>').text(elem.rentCount);
    var row7 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button disabled type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        console.log(elem.target)
        /*getCategoryById(elem.target.id)
        .done(category => {
            console.log(category);
            $('#inputEditId').val(category._id)
            $('#inputEditName').val(category.name)
            $('#inputEditDescription').val(category.description)
            $('#editItemModal').modal('show')
        })*/
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteItem(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    row7.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5, row6, row7]);
    $('tbody').append(row);
}