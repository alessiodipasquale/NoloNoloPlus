$(document).ready(function() {
    getReviews()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });
});


function addElemToTable(elem) {
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.stars);
    var row3 = $('<td></td>').text(elem.comment);
    var row4 = $('<td></td>').text(elem.clientId);
    var row5 = $('<td></td>').text(elem.itemId);
    var row6 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        console.log(elem.target)
        getReviewById(elem.target.id)
        .done(review => {
            console.log(review);
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

}

function edit() {

}