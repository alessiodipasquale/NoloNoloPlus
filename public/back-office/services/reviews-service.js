function createReview(stars, comment, itemId, clientId) {
    return httpPost('reviews', {stars, comment, itemId, clientId, itemId}, true);
}

function getReviews() {
    return httpGet('reviews', false);
}

function getReviewById(id) {
    return httpGet('reviews/'+id, true);
}

function deleteReview(id) {
    return httpDelete('reviews/'+id, true);
}

function editReview(_id, stars, comment ) {
    return httpPut('reviews/'+_id, {stars, comment}, true);
}