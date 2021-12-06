var itemsList = [];

$(document).ready(function() {
    

    getKits()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });

    $('#createKitModalButton').click(function(elem) {
        getItems()
        .done(res => {
            console.log(res);
            for (const elem of res) {
                const item = $('<li style="padding: 3px" id="'+elem._id+'"></li>')
                .click(function(elem) {
                    getItemById(elem.target.id)
                    .done(res => {
                        const it = $('<p></p>').text(res._id+' ,'+res.name+', Stato:'+res.state)
                        $('#objectList').append(it);
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
    console.log(elem);
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