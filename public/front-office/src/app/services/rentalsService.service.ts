import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private notificationsService: NotificationsService,
                private router: Router) { }

    getUserRentals(userId) {
        if (this.tokenService.isTokenSet())  
            return this.http.get('/users/'+userId+'/rentals');
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }

    getRentalById(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.get('/rentals/'+id);
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }   
    }

    createRental(startDate, endDate, objectId, timeInDays) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/rentals', {startDate, endDate, objectId, timeInDays,rentalType:"prenotazione",rentalTarget:'singolo',state:'futura'})
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }
    }

    deleteItem(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/items/'+id)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }

    deleteRental(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/rentals/'+id)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }
}