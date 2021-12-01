type RentalType = 'prenotazione' |'istantaneo';
type RentalTarget = 'singolo' | 'kit';
type State = 'in corso' | 'terminata' | 'futura' | 'non completabile';

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
    state: State
    finalPrice: number;
    receipt: string[];
    partialPrices: string[][]
    notes: string[]
}


export type {Rental} 