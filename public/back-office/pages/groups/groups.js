var itemsList = [];

$(document).ready(function() {
    getGroups()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });

    $('#createGroupModalButton').click(function(elem) {
        getItems()
        .done(res => {
            console.log(res);
            for (const elem of res) {
                const item = $('<li style="padding: 3px" id="'+elem._id+'"></li>')
                .click(function(elem) {
                    console.log(elem)
                    getItemById(elem.target.id)
                    .done(res => {
                        const row = $('<div class="row itemList" id="'+res._id+'" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px"></div>')
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

            $('#createGroupModal').modal('show')
        })
    })
});

function addElemToTable(elem) {
    console.log(elem);
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.name);
    var row3 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        console.log(elem.target)
        getGroupById(elem.target.id)
        .done(group => {
            console.log(group);
            $('#inputEditId').val(group._id)
            $('#inputEditName').val(group.name)
            $('#editGroupModal').modal('show')
            $('#itemsEditList').empty();
            itemsEditList = group.items;
            for (var res of itemsEditList) {
                const row = $('<div class="row itemList" id="'+res._id+'" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 3px"></div>')
                const it = $('<p style="margin-bottom: 0"></p>').text(res._id+' ,'+res.name+', Stato:'+res.state)
                const deleteItemBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+res._id+'"><i class="fas fa-trash" id="'+res._id+'"></i></button>')
                .click(function(elem) {
                    itemsEditList = itemsEditList.filter(el => el._id !== elem.target.id);
                    $('#'+elem.target.id+'.itemList').remove();
                })
                row.append(it);
                row.append(deleteItemBtn);
                $('#itemsEditList').append(row);
            }
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteGroup(elem.target.id)
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
    console.log(itemsList);
    createGroup(itemsList,name)
    .done(res => {
        addElemToTable(res);
        $('#createGroupModal').modal('hide')
    }).catch(err => alert("Errore nella creazione del kit."))
}

function edit() {

}