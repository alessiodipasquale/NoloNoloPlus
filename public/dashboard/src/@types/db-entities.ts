import { NumberDecrementStepperProps } from "@chakra-ui/number-input";

type RentalType = 'prenotazione' |'istantaneo';
type RentalTarget = 'singolo' | 'kit';
type RentalState = 'in corso' | 'terminata' | 'futura' | 'non completabile';
type Note = {
    text: string;
    author: string;
}
type ItemState = 'nuovo' | 'ottimo'|'buono'|'usurato'|'molto usurato'|'inutilizzabile'

interface Rental {
    _id: string;
    startDate: string;
    endDate: Date;
    clientId: Date;
    employerId: string;
    itemId: string[];
    kitId: string;
    timeInDays: number;
    rentalType: RentalType;
    rentalTarget: RentalTarget;
    rentalCertification: string;
    returnCertification: string;
    state: RentalState
    finalPrice: number;
    receipt: string[];
    partialPrices: string[][];
    notes: Note[];
    tags: string[];
    damaged: boolean;
}



interface Item {
    _id: string;
    description: string;
    standardPrice: number;
    category: string[];
    groupId?: string;
    imgSrc: string;
    state: ItemState;
    everBeenRented: boolean;
    rentalDates: Date[] ;
    available: boolean;
    rentCount: number;
    kits: string[];
    properties: string[];
    reviews: string[];
}


interface Client { 
    _id: String,
    username: string; 
    name: string;
    surname: string;
    favPaymentMethod?: 'carta'|'alla consegna'
    address?:string;
    loyaltyPoints: number;
    lastVisit: Date
    commentsFromOfficiers?: string;
    favCategories: string[],
    favItemsId: string[];
    role: "cliente"
    rentals: string[];
    reviews: string[];
    registrationDate: Date;
}

export type {Rental, Item, Client} 