import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    constructor(public http: HttpService) { }

    getCategories() {
        return this.http.get('/categories');
    }

    getCategoryById(id) {
        return this.http.get('/categories/'+id);
    }

    deleteCategory(id) {
        return this.http.delete('/categories/'+id)
    }

    getItems(id) {
        return this.http.get('/categories/'+id+'/items');
    }
}