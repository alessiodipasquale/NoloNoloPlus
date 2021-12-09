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
    endDate: string;
    clientId: string;
    employerId: string;
    itemId: string[];
    kitId: string;
    timeInDays: number;
    rentalType: RentalType;
    rentalTarget: RentalTarget;
    rentalCertification: string;
    state: RentalState
    finalPrice: number;
    receipt: string[];
    partialPrices: string[][];
    notes: Note[];
    tags: string[]
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


export type {Rental, Item} 