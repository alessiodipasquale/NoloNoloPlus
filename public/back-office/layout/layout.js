var listItems = $("#menuItems li");
for (let li of listItems) {
    $(li).children().on("click",function(){
        $('#content').load('../pages/'+$(li).children().attr('name')+'/'+$(li).children().attr('name')+'.html');
    })
}