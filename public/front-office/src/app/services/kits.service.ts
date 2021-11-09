import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class KitsService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private notificationsService: NotificationsService,
                private router: Router) { }

    getKits() {
        return this.http.get('/Kits');
    }

    getKitById(id) {
        return this.http.get('/Kits/'+id);
    }

    checkIfAvailable(startDate, endDate,kitId, objectId) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/Kits/'+kitId+'/checkIfAvailable', {startDate, endDate, objectId})
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }
    }

    deleteKit(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/Kits/'+id)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }
    }

    createRental(startDate, endDate, timeInDays, objectId, kitId) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/rentals', {startDate, endDate, timeInDays, objectId, rentalType:"prenotazione",rentalTarget: 'kit',state:'futura', kitId});
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }
    }
}