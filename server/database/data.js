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
        rentals: [],
        role: 'cliente'
    },
    {
        _id: "User1",
        username: "admin",
        password: "admin",
        name: "admin",
        surname: "admin",
        rentals: ["Rental1", "Rental2"],
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
        kitIds: [],
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
        kitIds: [],
        properties: ["Val2"]
    },
    {
        _id: "Item3",
        name: "Tesla Model S",
        description: "Macchina elettrica molto elettrica",
        standardPrice: 150,
        category: ["Category1"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "https://tesla-cdn.thron.com/delivery/public/image/tesla/195458a0-ff67-488c-b972-14d23d2c42fb/bvlatuR/std/1200x630/ms-homepage-social",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitIds: ["Kit1"],
        properties: ["Val1"]
    },
    {
        _id: "Item4",
        name: "Aprilia SR",
        description: "ao è tonda",
        standardPrice: 80,
        category: ["Category2"],
        priceDetailsId: "PriceDetail1",
        imgSrc: "https://cdn.autoportal.com/bp-v3/img/models/33/6/sr_150b2.jpg",
        state: 'ottimo',
        everBeenRented: false,
        rentalDates: [],
        available: true,
        rentCount: 0,
        kitIds: ["Kit1"],
        properties: ["Val2"]
    }

];

const categories = [
    {
        _id: "Category1",
        name: "Auto",
        description: "Automobili",
        associatedItems: ["Item1","Item3"],
        associatedProperties: ["Property1"]
    },
    {
        _id: "Category2",
        name: "Moto",
        description: "Moto",
        associatedItems: ["Item2","Item4"],
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
        clientId: "User1",
        timeInDays: 10,
        itemId: "Item1",
        state: 'terminata',
        rentalTarget: 'singolo',
        rentalType: 'istantaneo',
        rentalCertification: "Certification1",
        returnCertification: "Certification2"
    },
    {
        _id: "Rental2",
        startDate: new Date("<2021-10-05>"),
        endDate: new Date("<2023-10-10>"),
        clientId: "User1",
        timeInDays: 10,
        state: 'terminata',
        kitId: "Kit1",
        rentalType: 'istantaneo',
        rentalTarget: 'kit',
        rentalCertification: "Certification1",
        returnCertification: "Certification2"
    }
];

const kits = [
    {
        _id: "Kit1",
        name: "Pacchetto Auto e Moto", 
        description: "Pacchetto contenente una Tesla Model 3 e un Aprilia SR", 
        standardPrice: 300,
        category: ["Category1"],
        priceDetailsId: "PriceDetail1",
        items: ["Item3", "Item4"]
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
    rentals,
    kits
}