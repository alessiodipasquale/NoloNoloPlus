const getDatesFromARange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    dates.push(start);
    while(startDate.toISOString().substring(0, 10) != endDate.toISOString().substring(0, 10)){
        startDate.setDate(startDate.getDate() + 1);
        stringDate = startDate.toISOString().substring(0, 10);
        dates.push(stringDate);
    }
    return dates;
}

const arrayUnion = (src, dest) => {
    for(let elem of src){
        if(!dest.includes(elem))
            dest.push(elem)
    }
    return dest;
}

module.exports = {
    getDatesFromARange,
    arrayUnion
}