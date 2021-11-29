function getHeaders() {
    const token = localStorage.getItem("token");
    
    const headers= ({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${ token }`
    })

    return headers; 
}

function httpGet(endPoint, auth) {
    let options = '';
    if(auth)
        options = getHeaders();
    return $.ajax({
        url:'http://'+document.location.host+'/'+endPoint,
        type:'get',
        headers: options});
}

function httpPost(endPoint, data, auth) {
    let options = '';;
    if(auth)
        options = getHeaders();

    return $.ajax({
        url:'http://'+document.location.host+'/'+endPoint,
        type:'post',
        data: data,
        headers: options});
}

function httpDelete(endPoint, auth) {
    let options = '';
    if(auth)
        options = getHeaders();
    return $.ajax({
        url:'http://'+document.location.host+'/'+endPoint,
        type:'delete',
        headers: options});
}

function httpPatch(endPoint, data, auth) {
    let options = '';
    if(auth)
        options = getHeaders();
    return $.ajax({
        url:'http://'+document.location.host+'/'+endPoint,
        type:'patch',
        data: data,
        headers: options});
}

function httpPut(endPoint, data, auth) {
    let options = '';
    if(auth)
        options = getHeaders();
    return $.ajax({
        url:'http://'+document.location.host+'/'+endPoint,
        type:'put',
        data: data,
        headers: options});
}