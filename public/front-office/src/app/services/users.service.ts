import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private notificationsService: NotificationsService,
                private router: Router) { }

    getUsers() {
        if (this.tokenService.isTokenSet())  
            return this.http.get('/users');
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }

    getUserById(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.get('/users/'+id);
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }  
    }

    deleteUser(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/users/'+id)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }

    editUser(user) {
        if (this.tokenService.isTokenSet())  
            return this.http.put('/users', user)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }    
    }
}