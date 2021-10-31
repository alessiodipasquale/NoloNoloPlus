import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

    constructor(public http: HttpService) { }

    getUserRentals(userId) {
        return this.http.get('/users/'+userId+'/rentals');
    }

    getRentalById(id) {
        return this.http.get('/rentals/'+id);
    }

    createRental(startDate, endDate, objectId, timeInDays) {
        return this.http.post('/rentals', {startDate, endDate, objectId, timeInDays,rentalType:"prenotazione",rentalTarget:'singolo',state:'futura'})
    }

    deleteItem(id) {
        return this.http.delete('/items/'+id)
    }

    publishReview(stars , comment, itemId) {
        return this.http.post('/reviews', {stars, comment, itemId});
    }
}