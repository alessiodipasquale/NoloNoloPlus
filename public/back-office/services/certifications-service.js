function createCertification(rentalId, employeeId, certificationType, commentsFromEmployee) {
    return httpPost('certifications', {rentalId, employeeId, certificationType, commentsFromEmployee}, true);
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

function editCertification(_id, rentalId, certificationType, employeeId, certificationDate) {
    return httpPut('certifications', {_id, rentalId, certificationType, employeeId, certificationDate}, true);
}