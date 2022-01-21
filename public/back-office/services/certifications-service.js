function createCertification(rentalId, employerId, certificationType, commentsFromEmployer) {
    return httpPost('certifications', {rentalId, employerId, certificationType, commentsFromEmployer}, true);
}

function getCertifications() {
    return httpGet('certifications', true);
}

function getCertificationById(id) {
    return httpGet('certifications/'+id, true);
}

function deleteCertification(id) {
    return httpDelete('certifications/'+id, true);
}

function editCertification(_id, rentalId, certificationType, employerId, certificationDate) {
    return httpPut('certifications', {_id, rentalId, certificationType, employerId, certificationDate}, true);
}