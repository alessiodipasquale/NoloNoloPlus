import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private notificationsService: NotificationsService,
                private router: Router) { }

    publishReview(stars , comment, itemId) {
        if (this.tokenService.isTokenSet())  
            return this.http.post('/reviews', {stars, comment, itemId});
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }
    }

    deleteReview(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/reviews/'+id);
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }
}