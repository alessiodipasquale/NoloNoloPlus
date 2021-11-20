function getHeaders() {
    const token = localStorage.getItem("token");
    
    const headers= ({
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${ token }`
    })

    return headers; 
}

function httpGet(endPoint, auth) {
    const options  = {};
    if(auth)
        options.headers = getHeaders();
    return $.get('http://'+document.location.host+'/'+ endPoint, options);
}

function httpPost(endPoint, data, auth) {
    console.log('arrivo')
    const options  = {};
    if(auth)
        options.headers = getHeaders();
    return $.post('http://'+document.location.host+'/'+endPoint, data, options);
}