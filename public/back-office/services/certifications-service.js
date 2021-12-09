function createCertification(rentalId, certificationType) {
    return httpPost('certifications', {rentalId, certificationType}, true);
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

/*   Manca back-end
function editCertification(_id, rentalId, certificationType, employerId) {
    return httpPut('certifications', {_id, rentalId, certificationType, employerId}, true);
}*/