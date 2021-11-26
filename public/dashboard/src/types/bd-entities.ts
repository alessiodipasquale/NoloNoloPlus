type RentalType = 'prenotazione' |'istantaneo';
type RentalTarget = 'singolo' | 'kit';
type State = 'in corso' | 'terminata' | 'futura' | 'non completabile';

interface Rental {
    _id: String;
    startDate: String;
    endDate: String;
    clientId: String;
    employerId: String;
    itemId: String[];
    kitId: String;
    timeInDays: number;
    rentalType: RentalType;
    rentalTarget: RentalTarget;
    rentalCertification: String;
    state: State
    finalPrice: number;
    receipt: String[];
    partialPrices: String[][]
    notes: String[]
}


export type {Rental} 