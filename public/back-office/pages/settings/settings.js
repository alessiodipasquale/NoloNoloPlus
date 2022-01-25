$(document).ready(function() {
    getPriceDetails()
    .done(res => {
        console.log(res)
        $('#fidelityPriceMultiplier').val(fromIntToPercentage(res.fidelityPriceMultiplier))
        $('#good_state').val(fromIntToPercentage(res.good_state))
        $('#longUsageDiscountMultiplier').val(fromIntToPercentage(res.longUsageDiscountMultiplier))
        $('#unusable_state').val(fromIntToPercentage(res.unusable_state))
        $('#verygood_state').val(fromIntToPercentage(res.verygood_state))
        $('#veryworn_state').val(fromIntToPercentage(res.veryworn_state))
        $('#worn_state').val(fromIntToPercentage(res.worn_state))
    });
})

function fromIntToPercentage(int) {
    return Math.round((1-int)*100);
}

function fromPercentageToInt(percentage) {
    return 1-(percentage/100);
}

function editSettings() {

    const fidelityPriceMultiplier = fromPercentageToInt($('#fidelityPriceMultiplier').val())
    const good_state = fromPercentageToInt($('#good_state').val())
    const longUsageDiscountMultiplier = fromPercentageToInt($('#longUsageDiscountMultiplier').val())
    const unusable_state = fromPercentageToInt($('#unusable_state').val())
    const verygood_state = fromPercentageToInt($('#verygood_state').val())
    const veryworn_state = fromPercentageToInt($('#veryworn_state').val())
    const worn_state = fromPercentageToInt($('#worn_state').val())

    console.log(fidelityPriceMultiplier);

    editPriceDetails({fidelityPriceMultiplier, good_state, longUsageDiscountMultiplier, unusable_state, verygood_state, veryworn_state, worn_state})
    .done(res => {
        alert("Modifica avvenuta con successo.");
    }).catch(err => alert("Errore nella modifica."));
}