import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(public http: HttpService,
                private tokenService: TokenService,
                private router: Router,
                private notificationsService: NotificationsService) { }


    getCategories() {
        return this.http.get('/categories');
    }

    getCategoryById(id) {
        return this.http.get('/categories/'+id);
    }

    deleteCategory(id) {
        if (this.tokenService.isTokenSet())  
            return this.http.delete('/categories/'+id)
        else {
            this.notificationsService.error("Devi essere autenticato per effettuare questa operazione.")
            this.router.navigate(['/login']);
        }

    }

    getItems(id) {
        return this.http.get('/categories/'+id+'/items');
    }
}