const users = [
    {
        username: "Alessio2",
        password: "ciao",
        name: "Alessio",
        surname: "Di Pasquale"
    },
    {
        username: "admin",
        password: "admin",
        name: "admin",
        surname: "admin",
        role: "funzionario"
    }
];

const items = [
    {
        name: "palla da basket",
        description: "ao è tonda",
        standardPrice: 15,
        state: 'ottimo',
        rentalDates: [],
        category: 'cat1'
    }
];

module.exports = {
    users,
    items,
}