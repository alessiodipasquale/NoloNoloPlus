import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private notificationsService: NotificationsService,
                private router: Router) { }

    getItems() {
        return this.http.get('/items/filtered') 
    }

    calculatePrice(id, startDate, endDate) {
        return this.http.post('/items/'+id+'/price', {startDate, endDate}); 
    }

    getItemById(id) {
        return this.http.get('/items/'+id);
    }
    getReviewsByItemId(id) {
        return this.http.get('/items/'+id+'/reviews');
    }

    getRecommended(id) {
        return this.http.get('/items/'+id+'/recommended');
    }
    

    checkIfAvailable(startDate, endDate, objectId) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/items/'+objectId+'/available', {startDate, endDate, objectId})
            else {
                this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
                this.router.navigate(['/login']);
            }

    }

    createItem(item) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/items', item);
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
}