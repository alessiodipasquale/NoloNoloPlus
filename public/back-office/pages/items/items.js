var state = ""
var editstate = ""

$(document).ready(function() {
    loadAllItems();
});

function loadAllItems() {
    $('tbody').empty();
    getItems()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });
}

function setState(stat) {
    state = stat;
    $('#inputState').text(stat);
}

function setEditState(stat) {
    editstate = stat;
    $('#inputEditState').text(stat);
}

function openCreateItem() {
    $('#dropdown-category').empty();

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

    $('#dropdown-kits').empty();

    getKits()
    .done(res => {
        console.log(res);
        for (const kit of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`);
            const input = $('<input type="checkbox" class="form-check-input" name="kitSelected">').attr("id",kit._id);
            console.log(input.attr("id"));
            const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(kit.name);
            a.append(input);
            a.append(label);
          $('#dropdown-kits').append(a)
        }
    }) 

    
    $('#createItemModal').modal('show')
}

function confirmCreateItem() {
    const categorySelectedEl = $('input[name="categorySelected"]')
    const kitSelectedEl = $('input[name="kitSelected"]')

    var categoriesIds = [];
    var kitsIds = [];

    for(const category of categorySelectedEl) {
        if(category.checked)
            categoriesIds.push(category.id)
    }

    for(const kit of kitSelectedEl) {
        if(kit.checked)
            kitsIds.push(kit.id)
    }
    
    const name = $('#inputName').val();
    const price = $('#inputPrice').val();
    const inputDescription = $('#inputDescription').val();
    const inputImageUrl = $('#inputImageUrl').val();
    
    
        createItem(name, inputDescription, price, inputImageUrl, categoriesIds, kitsIds, state)
        .done((res) => {
            addElemToTable(res);
            $('#createItemModal').modal('hide')
        }).catch(err => alert("Errore nella creazione dell'utente."))
    
}

function confirmEditItem() {
    const editcategorySelectedEl = $('input[name="categoryEditSelected"]')
    const editkitSelectedEl = $('input[name="kitEditSelected"]')
    var editcategoriesIds = [];
    var editkitsIds = [];

    for(const category of editcategorySelectedEl) {
        if(category.checked)
            editcategoriesIds.push(category.id)
    }

    for(const kit of editkitSelectedEl) {
        if(kit.checked)
            editkitsIds.push(kit.id)
    }

    const id = $('#inputEditId').val();

    const editname = $('#inputEditName').val();
    const editprice = $('#inputEditPrice').val();
    const editinputDescription = $('#inputEditDescription').val();
    const editinputImageUrl = $('#inputEditImageUrl').val();

    console.log({editname, editinputDescription, editprice, editinputImageUrl, editcategoriesIds, editkitsIds, editstate})
    editItem(id, editname, editinputDescription, editprice, editinputImageUrl, editcategoriesIds, editkitsIds, editstate)
    .done((res) => {
        loadAllItems();
        $('#editItemModal').modal('hide')
    }).catch(err => alert("Errore nella modifica dell'utente."))
}

function openEditItem(elem) {

    console.log(elem.target)
    getItemById(elem.target.id)
    .done(item => {
        console.log(item);
        $('#inputEditId').val(item._id)
        $('#inputEditName').val(item.name)
        $('#inputEditPrice').val(item.standardPrice)
        $('#inputEditDescription').val(item.description)
        $('#inputEditImageUrl').val(item.imgSrc)
        $('#inputEditState').text(item.state)
        
        
        $('#dropdown-edit-category').empty();

        getCategories()
        .done(res => {
            console.log(res);
            for (const category of res) {
                var a = $(`<a class="dropdown-item" href="#"></a>`);
                const input = $('<input type="checkbox" class="form-check-input" name="categoryEditSelected">').attr("id",category._id);
                for(const cat of item.category) {
                    if (category._id == cat) 
                        input.attr("checked", "true")
                }
                console.log(input.attr("id"));
                const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(category.name);
                a.append(input);
                a.append(label);
              $('#dropdown-edit-category').append(a)
            }
        })
    
        $('#dropdown-edit-kits').empty();
    
        getKits()
        .done(res => {
            console.log(res);
            for (const kit of res) {
                var a = $(`<a class="dropdown-item" href="#"></a>`);
                const input = $('<input type="checkbox" class="form-check-input" name="kitEditSelected">').attr("id",kit._id);
                for(const k of item.kits) {
                    if (kit._id == k) 
                        input.attr("checked", "true")
                }
                console.log(input.attr("id"));
                const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(kit.name);
                a.append(input);
                a.append(label);
              $('#dropdown-edit-kits').append(a)
            }
        })
        
        $('#editItemModal').modal('show')
    }) 
}

function addElemToTable(elem) {
    console.log(elem);
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.description);
    var row4 = $('<td></td>').text(elem.categories.map(elem => elem.name));
    var row5 = $('<td></td>').text(elem.state);
    var row6 = $('<td></td>').text(elem.rentCount);
    var row7 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        openEditItem(elem);
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