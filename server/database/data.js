
//////////////////////////////////////////////////////////////////////////////////////// PRICEDETAILS

const priceDetails = [
  {
    _id: "PriceDetail1",
    longUsageDiscountMultiplier: 0.95,
    fidelityPriceMultiplier: 0.95,
    verygood_state: 0.95,
    good_state: 0.9,
    worn_state: 0.8,
    veryworn_state: 0.5,
    unusable_state: 0.4,
  },
];

//////////////////////////////////////////////////////////////////////////////////////// USERS

const users = [
  {
    _id: "Manager-ID",
    username: "manager",
    password: "manager",
    name: "manager",
    surname: "manager",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:0,
    favCategories:[],
    favItemsId:[],
    role: "manager",
    rentals: [],
    reviews:[],
    certifications:[],
    registrationDate: new Date(),
  },
  {
    _id: "Funzionario-ID",
    username: "funzionario",
    password: "funzionario",
    name: "funzionario",
    surname: "funzionario",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:0,
    favCategories:[],
    favItemsId:[],
    role: "funzionario",
    rentals: ["Rental1","Rental2","Rental3","Rental4","Rental5","Rental6","Rental7","Rental8","Rental9"],
    reviews:[],
    certifications:["Certification1","Certification2","Certification3","Certification4","Certification5","Certification6","Certification7","Certification8","Certification9"],
    registrationDate: new Date(),
  },
  {
    _id: "Cliente-ID-1",
    username: "cliente1",
    password: "cliente1",
    name: "cliente1",
    surname: "cliente1",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:0,
    commentsFromOfficiers:"bravo cliente",
    favCategories:[],
    favItemsId:[],
    role: "cliente",
    rentals: ["Rental1","Rental2"],
    reviews:["Review1","Review2","Review3","Review4"],
    certifications:[],
    registrationDate: new Date(),
  },
  {
    _id: "Cliente-ID-2",
    username: "cliente2",
    password: "cliente2",
    name: "cliente2",
    surname: "cliente2",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:10,
    commentsFromOfficiers:"bravo cliente",
    favCategories:[],
    favItemsId:[],
    role: "cliente",
    rentals: ["Rental3","Rental4"],
    reviews:["Review5","Review6"],
    certifications:[],
    registrationDate: new Date(),
  },
  {
    _id: "Cliente-ID-3",
    username: "cliente3",
    password: "cliente3",
    name: "cliente3",
    surname: "cliente3",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:50,
    commentsFromOfficiers:"bravo cliente",
    favCategories:[],
    favItemsId:[],
    role: "cliente",
    rentals: ["Rental5"],
    reviews:["Review7"],
    certifications:[],
    registrationDate: new Date(),
  },
  {
    _id: "Cliente-ID-4",
    username: "cliente4",
    password: "cliente4",
    name: "cliente4",
    surname: "cliente4",
    favPaymentMethod: "carta",
    address:"indirizzo test",
    loyaltyPoints:100,
    commentsFromOfficiers:"cliente cattivo",
    favCategories:[],
    favItemsId:[],
    role: "cliente",
    rentals: ["Rental6"],
    reviews:["Review8"],
    certifications:[],
    registrationDate: new Date(),
  }
];

//////////////////////////////////////////////////////////////////////////////////////// ITEMS

const items = [
  {
    _id: "Item1",
    name: "Tesla Model 3",
    description: "Macchina elettrica molto elettrica",
    standardPrice: 120,
    category: ["Category1"],
    imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: ["Kit1","Kit3"],
    properties: ["Val1","Val3","Val5","Val9"],
    reviews:["Review1"],
    rentals:["Rental1"]
  },
  {
    _id: "Item2",
    name: "Ducati Panigale",
    description: "Moto motosa",
    standardPrice: 80,
    category: ["Category2"],
    imgSrc:"https://www.sc-project.com/wp-content/uploads/2020/07/Ducati_Panigale-V4R_Completo_Replica_SBK_my2020_3-4Anteriore_960x720px.png",
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: ["Kit2","Kit3"],
    properties: ["Val6"],
    reviews:["Review2","Review8"],
    rentals:["Rental2"]
  },
  {
    _id: "Item3",
    name: "Tesla Model S",
    description: "Macchina elettrica molto elettrica",
    standardPrice: 150,
    category: ["Category1"],
    imgSrc:"https://tesla-cdn.thron.com/delivery/public/image/tesla/195458a0-ff67-488c-b972-14d23d2c42fb/bvlatuR/std/1200x630/ms-homepage-social",
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: ["Kit1"],
    properties: ["Val2","Val7","Val9"],
    reviews:["Review4"],
    rentals:["Rental3"]
  },
  {
    _id: "Item4",
    name: "Aprilia SR",
    description: "ao è tonda",
    standardPrice: 80,
    category: ["Category2"],
    imgSrc: "https://cdn.autoportal.com/bp-v3/img/models/33/6/sr_150b2.jpg",
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: ["Kit2"],
    properties: ["Val8"],
    reviews:["Review3","Review5"],
    rentals:["Rental4"]
  },
  {
    _id: "Item5",
    name: "Ps6",
    description: "è gialla",
    standardPrice: 69,
    category: ["Category3"],
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: [],
    properties: [],
    reviews:[],
    rentals:[],
    groupId: "Group1"
  },
  {
    _id: "Item6",
    name: "Ps6",
    description: "è gialla",
    standardPrice: 69,
    category: ["Category3"],
    state: "ottimo",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: [],
    properties: [],
    reviews:[],
    rentals:[],
    groupId: "Group1"
  },
  {
    _id: "Item7",
    name: "Ps5",
    description: "è gialla",
    standardPrice: 69,
    category: ["Category3"],
    imgSrc: "https://www.citypng.com/public/uploads/preview/-11591925787cggjhepdvq.png",
    state: "buono",
    everBeenRented: false,
    rentalDates: [],
    available: true,
    rentCount: 0,
    kits: [],
    properties: ["Val10","Val11"],
    reviews:["Review6","Review7"],
    rentals:["Rental6"]
  },
];

//////////////////////////////////////////////////////////////////////////////////////// KITS

const kits = [
  {
    _id: "Kit1",
    name: "Pacchetto Auto",
    description: "Pacchetto contenente una Tesla Model 3 e una Tesla Model S",
    standardPrice: 300,
    available:true,
    category: ["Category1"],
    items: ["Item1", "Item3"],
    rentals:[]
  },
  {
    _id: "Kit2",
    name: "Pacchetto Moto",
    description: "Pacchetto contenente due moto",
    standardPrice: 200,
    available:true,
    category: ["Category2"],
    items: ["Item2", "Item4"],
    rentals:[]
  },
  {
    _id: "Kit3",
    name: "Pacchetto Auto e Moto",
    description: "Pacchetto contenente un auto e una moto",
    standardPrice: 250,
    available:true,
    category: ["Category1","Category2"],
    items: ["Item1", "Item2"],
    rentals:["Rental5"]
  },
];

//////////////////////////////////////////////////////////////////////////////////////// CATEGORIES

const categories = [
  {
    _id: "Category1",
    name: "Auto",
    description: "Automobili",
    associatedItems: ["Item1", "Item3"],
  },
  {
    _id: "Category2",
    name: "Moto",
    description: "Moto",
    associatedItems: ["Item2", "Item4"],
  },
  {
    _id: "Category3",
    name: "Consoles",
    description: "Consoles",
    associatedItems: ["Item5", "Item6", "Item7"],
  },
];

//////////////////////////////////////////////////////////////////////////////////////// PROPERTIES

const properties = [
  {
    _id: "Property1",
    name: "Posti",
    associatedValues: ["Val1","Val2"],
  },
  {
    _id: "Property2",
    name: "Porte",
    associatedItems: ["Val3","Val4"],
  },
  {
    _id: "Property3",
    name: "Cilindrata",
    associatedItems: ["Val5","Val6","Val7","Val8"],
  },
  {
    _id: "Property4",
    name: "Airbag",
    associatedItems: ["Val9"],
  },
  {
    _id: "Property5",
    name: "RAM",
    associatedItems: ["Val10"],
  },
  {
    _id: "Property6",
    name: "SSD",
    associatedItems: ["Val11"],
  },
];

//////////////////////////////////////////////////////////////////////////////////////// PROPERTYVALUES

const propertyValues = [
  {
    _id: "Val1",
    value: "5",
    associatedItems: ["Item1"],
    associatedProperty: "Property1",
  },
  {
    _id: "Val2",
    value: "6",
    associatedItems: ["Item3"],
    associatedProperty: "Property1",
  },
  {
    _id: "Val3",
    value: "4",
    associatedItems: ["Item1"],
    associatedProperty: "Property2",
  },
  {
    _id: "Val4",
    value: "5",
    associatedItems: ["Item3"],
    associatedProperty: "Property2",
  },
  {
    _id: "Val5",
    value: "1600",
    unitOfMeasure: "cm3",
    associatedItems: ["Item1"],
    associatedProperty: "Property3",
  },
  {
    _id: "Val6",
    value: "1000",
    unitOfMeasure: "cm3",
    associatedItems: ["Item2"],
    associatedProperty: "Property3",
  },
  {
    _id: "Val7",
    value: "1500",
    unitOfMeasure: "cm3",
    associatedItems: ["Item3"],
    associatedProperty: "Property3",
  },
  {
    _id: "Val8",
    value: "1200",
    unitOfMeasure: "cm3",
    associatedItems: ["Item4"],
    associatedProperty: "Property3",
  },
  {
    _id: "Val9",
    associatedItems: ["Item1","Item3"],
    associatedProperty: "Property4",
  },
  {
    _id: "Val10",
    value: "8",
    unitOfMeasure: "GB",
    associatedItems: ["Item7"],
    associatedProperty: "Property5",
  },
  {
    _id: "Val11",
    value: "500",
    unitOfMeasure: "GB",
    associatedItems: ["Item7"],
    associatedProperty: "Property6",
  },

];

//////////////////////////////////////////////////////////////////////////////////////// GROUPS

const groups = [
  {
   _id:"Group1",
   items:["Item5","Item6"],
   name:"PS6" 
  }
]

//////////////////////////////////////////////////////////////////////////////////////// REVIEWS

const reviews = [
  {
    _id: "Review1",
    stars: 3.5,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-1",
    itemId: "Item1"
  },
  {
    _id: "Review2",
    stars: 5,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-1",
    itemId: "Item2"
  },
  {
    _id: "Review3",
    stars: 3,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-1",
    itemId: "Item4"
  },
  {
    _id: "Review4",
    stars: 2,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-1",
    itemId: "Item3"
  },
  {
    _id: "Review5",
    stars: 1,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-2",
    itemId: "Item4"
  },
  {
    _id: "Review6",
    stars: 3,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-2",
    itemId: "Item7"
  },
  {
    _id: "Review7",
    stars: 4.5,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-3",
    itemId: "Item7"
  },
  {
    _id: "Review8",
    stars: 4,
    comment: "tastes like chicken",
    clientId: "Cliente-ID-4",
    itemId: "Item2"
  },

]

//////////////////////////////////////////////////////////////////////////////////////// RENTALS


const rentals = [
  {
    _id: "Rental1",
    startDate: new Date("<2021-12-01>"),
    endDate: new Date("<2021-12-8>"),
    clientId: "Cliente-ID-1",
    employeeId: "Funzionario-ID",
    itemId: ["Item1"],
    kitId: null,
    timeInDays: 8,
    rentalType: "istantaneo",  
    rentalTarget: "singolo",
    rentalCertification: "Certification1",
    returnCertification: "Certification2",
    state: "terminata",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
  {
    _id: "Rental2",
    startDate: new Date("<2021-12-01>"),
    endDate: new Date("<2021-12-8>"),
    clientId: "Cliente-ID-1",
    employeeId: "Funzionario-ID",
    itemId: ["Item2"],
    kitId: null,
    timeInDays: 8,
    rentalType: "istantaneo",  
    rentalTarget: "singolo",
    rentalCertification: "Certification3",
    returnCertification: "Certification4",
    state: "terminata",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
  {
    _id: "Rental3",
    startDate: new Date("<2021-12-01>"),
    endDate: new Date("<2021-12-8>"),
    clientId: "Cliente-ID-2",
    employeeId: "Funzionario-ID",
    itemId: ["Item3"],
    kitId: null,
    timeInDays: 8,
    rentalType: "istantaneo",  
    rentalTarget: "singolo",
    rentalCertification: "Certification5",
    returnCertification: "Certification6",
    state: "terminata",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
  {
    _id: "Rental4",
    startDate: new Date("<2022-12-01>"),
    endDate: new Date("<2022-12-8>"),
    clientId: "Cliente-ID-2",
    employeeId: "",
    itemId: ["Item4"],
    kitId: null,
    timeInDays: 8,
    rentalType: "prenotazione",  
    rentalTarget: "singolo",
    rentalCertification: "",
    returnCertification: "",
    state: "futura",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
  {
    _id: "Rental5",
    startDate: new Date("<2021-12-01>"),
    endDate: new Date("<2021-12-8>"),
    clientId: "Cliente-ID-3",
    employeeId: "Funzionario-ID",
    itemId: ["Item1","Item2"],
    kitId: "Kit3",
    timeInDays: 8,
    rentalType: "istantaneo",  
    rentalTarget: "kit",
    rentalCertification: "Certification7",
    returnCertification: "Certification8",
    state: "terminata",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
  {
    _id: "Rental6",
    startDate: new Date("<2022-01-01>"),
    endDate: new Date("<2022-01-30>"),
    clientId: "Cliente-ID-4",
    employeeId: "Funzionario-ID",
    itemId: ["Item7"],
    kitId: null,
    timeInDays: 30,
    rentalType: "istantaneo",  
    rentalTarget: "singolo",
    rentalCertification: "Certification9",
    returnCertification: "",
    state: "in corso",
    finalPrice: 1000,
    receipt: ["Prezzo fissato"],
    notes: "Tutto ok",
    damage: 50,
  },
]




//////////////////////////////////////////////////////////////////////////////////////// CERTIFICATIONS

const certifications = [
  {
    _id: "Certification1",
    rentalId: "Rental1",
    employeeId: "Funzionario-ID",
    certificationType: "ritiro",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification2",
    rentalId: "Rental1",
    employeeId: "Funzionario-ID",
    certificationType: "riconsegna",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification3",
    rentalId: "Rental2",
    employeeId: "Funzionario-ID",
    certificationType: "ritiro",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification4",
    rentalId: "Rental2",
    employeeId: "Funzionario-ID",
    certificationType: "riconsegna",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification5",
    rentalId: "Rental3",
    employeeId: "Funzionario-ID",
    certificationType: "ritiro",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification6",
    rentalId: "Rental3",
    employeeId: "Funzionario-ID",
    certificationType: "riconsegna",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification7",
    rentalId: "Rental5",
    employeeId: "Funzionario-ID",
    certificationType: "ritiro",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification8",
    rentalId: "Rental5",
    employeeId: "Funzionario-ID",
    certificationType: "riconsegna",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
  {
    _id: "Certification9",
    rentalId: "Rental6",
    employeeId: "Funzionario-ID",
    certificationType: "ritiro",
    commentsFromEmployee: "tutto ok",
    certificationDate: new Date("<2021-12-01>")
  },
];

/////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
  users,
  items,
  categories,
  certifications,
  priceDetails,
  properties,
  propertyValues,
  rentals,
  kits,
  groups,
  reviews
};
