function getPriceDetails() {
    return httpGet('priceDetails', true);
}

function editPriceDetails(object) {
    return httpPut('priceDetails', object, true);
}