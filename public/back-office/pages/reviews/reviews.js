var selectedItemId = null;
var selectedUserId = null;

$(document).ready(function() {
    getReviews()
    .done(res => {
        for(const elem of res){
            addElemToTable(elem);
        }
    });
});

function openCreateReview() {
    $('#dropdown-items').empty();
    getItems()
    .done(res => {
        for (const item of res) {
            var a = $('<a class="dropdown-item" href="#"></a>');
            a.text(item.name);
            a.attr("id", item._id);
            a.click(function(elem) {
                $("#inputItem").text(elem.target.text)
                selectedItemId = elem.target.id;
            })
            $('#dropdown-items').append(a); 
        }
    })

    $('#dropdown-users').empty();
    getUsers()
    .done(res => {
        for(const user of res) {
            var a = $('<a class="dropdown-item" href="#"></a>');
            a.text(user.name +' '+user.surname);
            a.attr("id", user._id);
            a.click(function(elem) {
                $("#inputUser").text(elem.target.text)
                selectedUserId = elem.target.id;
            })
            $('#dropdown-users').append(a); 
        }
    })

    $('#createReviewModal').modal('show');
}


function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td name="stars"></td>').text(elem.stars);
    var row3 = $('<td name="comment"></td>').text(elem.comment);
    var row4 = $('<td></td>').text(elem.clientId);
    var row5 = $('<td></td>').text(elem.itemId);
    var row6 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        getReviewById(elem.target.id)
        .done(review => {
            $('#inputEditId').val(review._id)
            $('#inputEditStars').val(review.stars)
            $('#inputEditComment').val(review.comment)
            $('#editReviewModal').modal('show')
        })
    })

    var deleteBtn = $('<button type="button" class="btn btn-danger" id="'+elem._id+'"><i class="far fa-trash-alt" id="'+elem._id+'"></i></button>')
    deleteBtn.click(function (elem) {
        var r = confirm("Sei sicuro di voler eliminare?");
        if (r) {
            deleteReview(elem.target.id)
            .done( () => {
                $('#'+elem.target.id).remove();
            });
        }
    })

    row6.append([/*openBtn,*/ editBtn, deleteBtn]);
            
    row.append([row1, row2, row3, row4, row5, row6]);
    $('tbody').append(row);
}

function create() {
    const stars = $('#inputStars').val();
    const comment = $('#inputComment').val();
    if(stars=='' || comment == '' || selectedItemId == null || selectedUserId == null) {
        alert('Inserisci tutti i campi.')
    } else {
        createReview(stars, comment, selectedItemId, selectedUserId)
        .done(res => {
            addElemToTable(res);
            $('#createReviewModal').modal('hide')
        }).catch(err => alert("Errore nella creazione della recensione."))
    }
}

function edit() {
    const id = $('#inputEditId').val();
    const stars = $('#inputEditStars').val();
    const comment = $('#inputEditComment').val();
    if(stars=='' || comment == '') {
        alert('Inserisci tutti i campi.')
    } else {
        editReview(id, stars, comment)
        .done(res => {
            const row = $('#'+res._id);
            row.children('td[name="stars"]').text(res.stars);
            row.children('td[name="comment"]').text(res.comment);
            $('#editReviewModal').modal('hide')
        }).catch(err => alert("Errore nella modifica della recensione."))
    }
}