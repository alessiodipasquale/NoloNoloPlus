var state = ""
var editstate = ""
var groupId = null
var propertyId = undefined
var propertyName;
var properties = [];

var propertyEditId = undefined
var propertyEditName;
var propertiesEdit = [];

$(document).ready(function() {
    loadAllItems();
    setSearch();
});

function loadAllItems() {
    $('tbody').empty();
    getItems()
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
    groupId = null;

    getCategories()
    .done(res => {
        for (const category of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`);
            const input = $('<input type="checkbox" class="form-check-input" name="categorySelected">').attr("id",category._id);
            const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(category.name);
            a.append(input);
            a.append(label);
          $('#dropdown-category').append(a)
        }
    })

    $('#dropdown-kits').empty();

    getKits()
    .done(res => {
        for (const kit of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`);
            const input = $('<input type="checkbox" class="form-check-input" name="kitSelected">').attr("id",kit._id);
            const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(kit.name);
            a.append(input);
            a.append(label);
          $('#dropdown-kits').append(a)
        }
    }) 

    $('#dropdown-groups').empty();
    getGroups()
    .done(res => {
        for (const group of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`).text(group.name);
            a.attr("id",group._id);
            a.click(function(elem) {
                groupId = elem.target.id;
                $('#inputGroup').text(elem.target.text);
            })
            $('#dropdown-groups').append(a);
        }

    })

    $('#dropdown-property').empty();

    getProperties()
    .done(res => {
        for (const property of res) {
            var a = $(`<a class="dropdown-item" href="#"></a>`).text(property.name);
            a.attr("id",property._id);
            a.click(function(elem) {
                propertyId = elem.target.id;
                propertyName = elem.target.text;
                $('#inputProperty').text(elem.target.text);
            })
            $('#dropdown-property').append(a);
        }
    });

    
    $('#createItemModal').modal('show')
}

function addPropertyToList() {
    if(propertyId != undefined && propertyName != undefined) {
        const propertyValue = $('#inputValueProperty').val()
        const unitOfMeasure = $('#inputUnitOfMeasureProperty').val() !== '' ? $('#inputUnitOfMeasureProperty').val() : undefined
        properties.push({associatedProperty: propertyId, value: propertyValue, unitOfMeasure: unitOfMeasure});
        const row = $(`<div class="row" style="margin-bottom: 3px; border-bottom: 1px solid lightgrey; padding: 1%"></div>`)
        row.attr("id","prop"+propertyId);
        const firstCol= $(`<div class="col-10" style="display: flex; align-items: center"></div>`)
        firstCol.text(propertyValue+' '+(unitOfMeasure != undefined ? unitOfMeasure+' ' : '')+propertyName)
        const secondCol =$(`<div class="col-2"></div>`)
        const deleteItemBtn = $('<button type="button" class="btn btn-danger mr-3" id="'+propertyId+'"><i class="fas fa-trash" id="'+propertyId+'"></i></button>')

        deleteItemBtn.click(function(elem) {
            $('#prop'+elem.target.id).remove();
            properties = properties.filter(el => el.associatedProperty != elem.target.id);
        });

        secondCol.append(deleteItemBtn);
        row.append([firstCol,secondCol])
        $('#propertiesList').append(row);

        propertyId = undefined;
        propertyName = undefined;
        $('#inputValueProperty').val('')
        $('#inputInputTypeProperty').val('')
        $('#inputProperty').text("Scegli proprietà");
    }
}

function addEditPropertyToList() {
        if(propertyEditId != undefined && propertyEditName != undefined) {
            const propertyValue = $('#inputEditValueProperty').val()
            const unitOfMeasure = $('#inputEditUnitOfMeasureProperty').val() !== '' ? $('#inputEditUnitOfMeasureProperty').val() : undefined
            propertiesEdit.push({associatedProperty: propertyEditId, value: propertyValue, unitOfMeasure: unitOfMeasure});
            const row = $(`<div class="row" style="margin-bottom: 3px; border-bottom: 1px solid lightgrey; padding: 1%"></div>`)
            row.attr("id","prop"+propertyEditId);
            const firstCol= $(`<div class="col-10" style="display: flex; align-items: center"></div>`)
            firstCol.text(propertyValue+' '+(unitOfMeasure != undefined ? unitOfMeasure+' ' : '')+propertyEditName)
            const secondCol =$(`<div class="col-2"></div>`)
            const deleteItemBtn = $('<button type="button" class="btn btn-danger mr-3" id="'+propertyEditId+'"><i class="fas fa-trash" id="'+propertyEditId+'"></i></button>')
    
            deleteItemBtn.click(function(elem) {
                $('#prop'+elem.target.id).remove();
                propertiesEdit = propertiesEdit.filter(el => el.associatedProperty != elem.target.id);
            });
    
            secondCol.append(deleteItemBtn);
            row.append([firstCol,secondCol])
            $('#editPropertiesList').append(row);
    
            propertyEditId = undefined;
            propertyEditName = undefined;
            $('#inputEditValueProperty').val('')
            $('#inputEditUnitOfMeasureProperty').val('')
            $('#inputEditProperty').text("Scegli proprietà");
        }
    
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
    const inputImageUrl = $('#inputImageUrl').val() != '' ? $('#inputImageUrl').val() : undefined;
    const available = $('#inputAvailable').is(':checked');

    createItem(name, inputDescription, available, price, inputImageUrl, categoriesIds, kitsIds, state, groupId, properties)
        .done((res) => {
            loadAllItems();
            clearInputs();
            $('#createItemModal').modal('hide')
        }).catch(err => alert("Errore nella creazione dell'oggetto."))
}

function clearInputs() {
    $('#inputName').val('');
    $('#inputPrice').val('');
    $('#inputDescription').val('');
    $('#inputImageUrl').val('');
    $('#inputState').text('Scegli Stato');
    $('#inputGroup').text('Scegli Gruppo');
    state = null;
    groupId = null;
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
    const editAvailable = $('#inputEditAvailable').is(':checked');


    editItem(id, editname, editinputDescription, editAvailable, editprice, editinputImageUrl, editcategoriesIds, editkitsIds, editstate, groupId, propertiesEdit)
    .done((res) => {
        loadAllItems();
        $('#editItemModal').modal('hide')
    }).catch(err => alert("Errore nella modifica dell'oggetto."))
}

function openEditItem(elem) {

    getItemById(elem.target.id)
    .done(item => {
        editstate = item.state;

        $('#inputEditId').val(item._id)
        $('#inputEditName').val(item.name)
        $('#inputEditPrice').val(item.standardPrice)
        $('#inputEditDescription').val(item.description)
        $('#inputEditImageUrl').val(item.imgSrc)
        $('#inputEditState').text(item.state)
        
        if(item.available)
            $('#inputEditAvailable').prop('checked', true);
        else 
            $('#inputEditAvailable').prop('checked', false);


        
        $('#dropdown-edit-category').empty();

        getCategories()
        .done(res => {
            for (const category of res) {
                var a = $(`<a class="dropdown-item" href="#"></a>`);
                const input = $('<input type="checkbox" class="form-check-input" name="categoryEditSelected">').attr("id",category._id);
                for(const cat of item.category) {
                    if (category._id == cat) 
                        input.attr("checked", "true")
                }
                const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(category.name);
                a.append(input);
                a.append(label);
              $('#dropdown-edit-category').append(a)
            }
        })
    
        $('#dropdown-edit-kits').empty();
    
        getKits()
        .done(res => {
            for (const kit of res) {
                var a = $(`<a class="dropdown-item" href="#"></a>`);
                const input = $('<input type="checkbox" class="form-check-input" name="kitEditSelected">').attr("id",kit._id);
                for(const k of item.kits) {
                    if (kit._id == k) 
                        input.attr("checked", "true")
                }
                const label = $('<label class="form-check-label" for="dropdownCheck"></label>').text(kit.name);
                a.append(input);
                a.append(label);
              $('#dropdown-edit-kits').append(a)
            }
        })

        if(item.groupId)
            groupId = item.groupId;
        else groupId = null;

        $('#dropdown-editgroups').empty();

        getGroups()
        .done(res => {
            for (const group of res) {
                if(groupId == group._id)
                    $('#inputEditGroup').text(group.name);

                var a = $(`<a class="dropdown-item" href="#"></a>`).text(group.name);
                a.attr("id",group._id);
                a.click(function(elem) {
                    groupId = elem.target.id;
                    $('#inputEditGroup').text(elem.target.text);
                })
                $('#dropdown-editgroups').append(a);
            }

        })

        $('#dropdown-editproperty').empty();
        $('#editPropertiesList').empty();

        getProperties()
        .done(res => {
            for (const property of res) {
                var a = $(`<a class="dropdown-item" href="#"></a>`).text(property.name);
                a.attr("id",property._id);
                a.click(function(elem) {
                    propertyEditId = elem.target.id;
                    propertyEditName = elem.target.text;
                    $('#inputEditProperty').text(elem.target.text);
                })
                $('#dropdown-editproperty').append(a);
            }
        });


        
        propertiesEdit = item.propertiesList;
        for (const property of propertiesEdit) {
            const row = $(`<div class="row" style="margin-bottom: 3px; border-bottom: 1px solid lightgrey; padding: 1%"></div>`)
            row.attr("id","prop"+property.associatedProperty);
            const firstCol= $(`<div class="col-10" style="display: flex; align-items: center"></div>`)
            firstCol.text(property.value+' '+(property.unitOfMeasure != undefined ? property.unitOfMeasure+' ' : '')+property.name)
            const secondCol =$(`<div class="col-2"></div>`)
            const deleteItemBtn = $('<button type="button" class="btn btn-danger mr-3" id="'+property.associatedProperty+'"><i class="fas fa-trash" id="'+property.associatedProperty+'"></i></button>')

            deleteItemBtn.click(function(elem) {
                $('#prop'+elem.target.id).remove();
                propertiesEdit = propertiesEdit.filter(el => el.associatedProperty != elem.target.id);
            });
            secondCol.append(deleteItemBtn);
            row.append([firstCol,secondCol])
            $('#editPropertiesList').append(row)
        }
        
        $('#editItemModal').modal('show')
    }) 
}

function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.description);
    var row4 = $('<td></td>').text(elem.categoriesList.map(elem => elem.name));
    var row5 = $('<td></td>').text(elem.state);
    var row6 = $('<td></td>').text(elem.rentCount);
    var row7 = $('<td></td>').append(elem.available ? '<span class="dot dot-success"></span>' : '<span class="dot dot-danger"></span>');
    var row8 = $('<td></td>');
    
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

    row8.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5, row6, row7, row8]);
    $('tbody').append(row);
}