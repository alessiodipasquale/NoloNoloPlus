$(document).ready(function() {
    getCertifications()
    .done(res => {
        console.log(res);
        for(const elem of res){
            addElemToTable(elem);
        }
    });
});

function addElemToTable(elem) {
    console.log(elem);
    var row = $('<tr id='+elem._id+'></tr>');
    var row1 = $('<td></td>').text(elem._id);
    var row2 = $('<td></td>').text(elem.rentalId.toString());
    var row3 = $('<td></td>').text(elem.employerId.toString());
    var row4 = $('<td></td>').text(elem.certificationType);
    var row5 = $('<td></td>').text(elem.certificationDate.toString());
    var row6 = $('<td></td>').text(elem.commentsFromEmployer);
    var row7 = $('<td></td>');
    
    /*var openBtn = $('<button type="button" class="btn btn-primary" id='+elem._id+'><i class="far fa-eye"></i></button>')
    openBtn.click(function (elem) {
        console.log(elem.target.id);
    })*/

    var editBtn = $('<button disabled type="button" class="btn btn-primary mr-3" id="'+elem._id+'"><i class="fas fa-eye" id="'+elem._id+'"></i></button>')
    editBtn.click(function (elem) {
        console.log(elem.target)
        getCertificationById(elem.target.id)
        .done(certification => {
            console.log(certification);
            $('#inputEditId').val(certification._id)
            $('#editCertificationModal').modal('show')
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

function create() {

}

function edit() {

}