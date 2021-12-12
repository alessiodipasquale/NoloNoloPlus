function createReview(stars, itemId) {
    return httpPost('reviews', {stars, itemId}, true);
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

function editReview(_id, stars, itemId, comment, clientId ) {
    return httpPut('reviews', {_id, stars, itemId, comment, clientId }, true);
}