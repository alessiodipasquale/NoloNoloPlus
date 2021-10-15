const users = [
    {
        _id: "User2",
        username: "Alessio",
        password: "ciao",
        name: "Alessio",
        surname: "Di Pasquale",
        favPaymentMethod: 'carta',
        address: "Via Massarenti 470",
        commentsFromOfficiers: 'cliente cattivo',
        favItemsId: [],
        role: 'cliente'
    },
    {
        _id: "User1",
        username: "admin",
        password: "admin",
        name: "admin",
        surname: "admin",
        role: "funzionario"
    }
];

const items = [
    {
        _id: "Item1",
        name: "palla da basket",
        description: "ao è tonda",
        standardPrice: 15,
        category: ["Category1"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitItems: ["Item2"],
        properties: ["Property1"]
    },
    {
        _id: "Item2",
        name: "palla da calcio",
        description: "ao è tonda",
        standardPrice: 15,
        category: ["Category1"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitItems: ["Item1"],
        properties: ["Property1"]
    }

];

const categories = [
    {
        _id: "Category1",
        name: "palle",
        description: "so palle",
        associatedItems: ["Item1"],
        associatedProperties: ["Property1"]
    }
];

const certifications = [
    {
        _id: "Certification1",
        rentalId: "Rental1",
        employerId: "User1",
        certificationType: 'ritiro',
        commentsFromEmployer: "tutto ok"
    },
    {
        _id: "Certification2",
        rentalId: "Rental1",
        employerId: "User1",
        certificationType: 'riconsegna',
        commentsFromEmployer: "tutto ok"
    }
];

const priceDetails = [
    {
        _id:"PriceDetail1",
        itemsId: ["Item1", "Item2"],
        longUsageDiscountMultiplier: 1,
        fidelityPriceMultiplier: 1,
        new_state: 1, 
        verygood_state: 1, 
        good_state: 1,
        worn_state: 1,
        veryworn_state: 1,
        unusable_state: 1
    }
];

const properties = [
    {
        _id: "Property1",
        name: "Dimensione", 
        value: 3, 
        unitOfMeasure: "cm3",
        associatedItems: ["Item1", "Item2"]
    }
];

const rentals = [
    {
        _id: "Rental1",
        startDate: new Date("<2021-10-01>"),
        endDate: new Date("<2021-10-02>"),
        clientId: "User2",
        employerId: "User1",
        timeInDays: 10,
        rentalType: 'istantaneo',
        rentalCertification: "Certification1",
        returnCertification: "Certification2"
    }
];

module.exports = {
    users,
    items,
    categories,
    certifications,
    priceDetails,
    properties,
    rentals
}