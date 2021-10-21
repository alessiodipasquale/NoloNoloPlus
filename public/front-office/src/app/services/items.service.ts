import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

    constructor(public http: HttpService) { }

    getItems() {
        return this.http.get('/items');
    }

    getItemById(id) {
        return this.http.get('/items/'+id);
    }

    checkIfAvailable(startDate, endDate, objectId) {
        return this.http.post('/items/'+objectId+'/checkIfAvailable', {startDate, endDate, objectId})
    }

    deleteItem(id) {
        return this.http.delete('/items/'+id)
    }
}