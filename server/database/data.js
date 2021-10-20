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
        name: "Tesla Model 3",
        description: "Macchina elettrica molto elettrica",
        standardPrice: 120,
        category: ["Category1"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitItems: ["Item2"],
        properties: ["Val1"]
    },
    {
        _id: "Item2",
        name: "Ducati Panigale",
        description: "ao è tonda",
        standardPrice: 80,
        category: ["Category2"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "https://www.sc-project.com/wp-content/uploads/2020/07/Ducati_Panigale-V4R_Completo_Replica_SBK_my2020_3-4Anteriore_960x720px.png",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitItems: ["Item1"],
        properties: ["Val2"]
    }

];

const categories = [
    {
        _id: "Category1",
        name: "Auto",
        description: "Automobili",
        associatedItems: ["Item1"],
        associatedProperties: ["Property1"]
    },
    {
        _id: "Category2",
        name: "Moto",
        description: "Moto",
        associatedItems: ["Item2"],
        associatedProperties: ["Property2"]
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
        name: "Posti", 
        associatedValues: ["Val1"]
    },
    {
        _id: "Property2",
        name: "Cilindrata", 
        associatedItems: ["Val2"]
    }
];

const propertyValues = [
    {
        _id: "Val1",
        value: "5",
        associatedItems: ["Item2"],
        associatedProperty: "Property1"
    },
    {
        _id: "Val2",
        value: "1600",
        unitOfMeasure: "cm3",
        associatedItems: ["Item1"],
        associatedProperty: "Property2"
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
    propertyValues,
    rentals
}