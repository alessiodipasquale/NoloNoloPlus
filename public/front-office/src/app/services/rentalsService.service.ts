import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

    constructor(public http: HttpService) { }

    getRentals() {
        return this.http.get('/rentals');
    }

    getRentalById(id) {
        return this.http.get('/rentals/'+id);
    }

    createRental(startDate, endDate, objectId, timeInDays) {
        return this.http.post('/rentals', {startDate, endDate, objectId, timeInDays,rentalType:"prenotazione"})
    }

    deleteItem(id) {
        return this.http.delete('/items/'+id)
    }
}