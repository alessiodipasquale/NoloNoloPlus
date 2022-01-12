$(document).ready(function() {
    const token = localStorage.getItem('token');
    if (!token) {
        var pathname = window.location.origin;
       window.location.replace(pathname+'/back-office/login/login.html');
    }
    $('#content').load('../pages/users/users.html');
})

var listItems = $("#menuItems li");
for (let li of listItems) {
    $(li).children().on("click",function(){
        $('#content').load('../pages/'+$(li).children().attr('name')+'/'+$(li).children().attr('name')+'.html');
        $(li).children().addClass("active");
        for (let list of listItems) {
            if (li !== list) {
                $(list).children().removeClass("active");
            }
        }
    })
}

$('#logoutBtn').on("click", function () {
    localStorage.setItem('token', '');
    var pathname = window.location.origin;
    window.location.replace(pathname+'/back-office/login/login.html');
});