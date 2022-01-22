var itemsList = [];
var itemsEditList = [];
$(document).ready(function() {
    

    loadAllKits();
    setSearch();
    
    $('#createKitModalButton').click(function(elem) {
        $('#dropdown-items').empty();

        getItems()
        .done(res => {
            for (const elem of res) {
                const item = $('<li style="padding: 3px" id="'+elem._id+'"></li>')
                .click(function(elem) {
                    getItemById(elem.target.id)
                    .done(res => {
                        const row = $('<div class="row itemList" id="'+res._id+'" style="display: flex; align-items: center; justify-content: space-around; margin-bottom: 3px"></div>')
                        const it = $('<p style="margin-bottom: 0"></p>').text(res._id+' ,'+res.name+', Stato:'+res.state)
                        const deleteItemBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+res._id+'"><i class="fas fa-trash" id="'+res._id+'"></i></button>')
                        .click(function(elem) {
                            itemsList = itemsList.filter(el => el._id !== elem.target.id);
                            $('#'+elem.target.id+'.itemList').remove();
                        })
                        row.append(it);
                        row.append(deleteItemBtn);
                        $('#objectList').append(row);
                        itemsList.push(res)
                    })
                })
                const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+', Stato:'+elem.state)
                item.append(link);
                $('#dropdown-items').append(item);
            }

            $(document).ready(function(){
                $("#filterItems").on("keyup", function() {
                  var value = $(this).val().toLowerCase();
                  $(".dropdown-menu li").filter(function() {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                  });
                });
              });

            $('#createKitModal').modal('show')
        })
        
    });
});

function setSearch() {
    $("#searchtext").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
}

function loadAllKits() {
    $('tbody').empty();
    getKits()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });
}

function create() {
    const name = $('#inputName').val();
    const standardPrice = $('#inputStandardPrice').val();
    const available = $('#inputAvailable').is(':checked');
    const description = $('#inputDescription').val();
    createKit(name , description, standardPrice, itemsList, available)
    .done(res => {
        addElemToTable(res);
        $('#createKitModal').modal('hide')
    }).catch(err => alert("Errore nella creazione del kit."))
}


function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>').text(elem.description);
    var row4 = $('<td></td>').text(elem.category.toString());
    var row5 = $('<td></td>').text(elem.available);
    var row6 = $('<td></td>').text(elem.items.map(item => item.name+ ''));
    var row7 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getKitById(elem.target.id)
        .done(kit => {

            $('#editObjectList').empty();
            $('.elementEditDropdown').remove()

            

            itemsEditList = kit.items;
            for (var res of itemsEditList) {
                const row = $('<div class="row itemList" id="'+res._id+'" style="display: flex; align-items: center; justify-content: space-around; margin-bottom: 3px"></div>')
                const it = $('<p style="margin-bottom: 0"></p>').text(res._id+' ,'+res.name+', Stato:'+res.state)
                const deleteItemBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+res._id+'"><i class="fas fa-trash" id="'+res._id+'"></i></button>')
                .click(function(elem) {
                    itemsEditList = itemsEditList.filter(el => el._id !== elem.target.id);
                    $('#'+elem.target.id+'.itemList').remove();
                })
                row.append(it);
                row.append(deleteItemBtn);
                $('#editObjectList').append(row);
            }
            $('#inputEditId').val(kit._id)
            $('#inputEditName').val(kit.name)
            $('#inputEditStandardPrice').val(kit.standardPrice)
            $('#inputEditAvailable').val(kit.available)
            $('#inputEditDescription').val(kit.description)
            $('#inputEditAvailable').val(kit.available)
            
            getItems()
            .done(res => {
                for (const elem of res) {
                    const item = $('<li class="elementEditDropdown" style="padding: 3px" id="'+elem._id+'"></li>')
                    .click(function(elem) {
                        getItemById(elem.target.id)
                        .done(res => {
                            const row = $('<div class="row itemList" id="'+res._id+'" style="display: flex; align-items: center; justify-content: space-around; margin-bottom: 3px"></div>')
                            const it = $('<p style="margin-bottom: 0"></p>').text(res._id+' ,'+res.name+', Stato:'+res.state)
                            const deleteItemBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+res._id+'"><i class="fas fa-trash" id="'+res._id+'"></i></button>')
                            .click(function(elem) {
                                itemsEditList = itemsEditList.filter(el => el._id !== elem.target.id);
                                $('#'+elem.target.id+'.itemList').remove();
                            })
                            row.append(it);
                            row.append(deleteItemBtn);
                            $('#editObjectList').append(row);
                            itemsEditList.push(res)
                        })
                    })
                    const link = $('<a id="'+elem._id+'" href="#"></a>').text(elem._id+' ,'+elem.name+', Stato:'+elem.state)
                    item.append(link);
                    $('#dropdown-edititems').append(item);
                }
    
                $(document).ready(function(){
                    $("#editFilterItems").on("keyup", function() {
                        var value = $(this).val().toLowerCase();
                        $(".dropdown-menu li").filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    });
                    });
    
            })
                
            $('#editKitModal').modal('show')
        })
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

function edit() {
    const id = $('#inputEditId').val();
    const name = $('#inputEditName').val()
    const description = $('#inputEditDescription').val()

    const standardPrice = $('#inputEditStandardPrice').val()
    const available = $('#inputEditAvailable').val()

    editKit(id, name, description, standardPrice, available, itemsEditList)
    .done(() => {
        loadAllKits();
        $('#editKitModal').modal('hide')
    })
}