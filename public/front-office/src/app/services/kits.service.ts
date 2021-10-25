import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class KitsService {

    constructor(public http: HttpService) { }

    getKits() {
        return this.http.get('/Kits');
    }

    getKitById(id) {
        return this.http.get('/Kits/'+id);
    }

    checkIfAvailable(startDate, endDate,kitId, objectId) {
        return this.http.post('/Kits/'+kitId+'/checkIfAvailable', {startDate, endDate, objectId})
    }

    deleteKit(id) {
        return this.http.delete('/Kits/'+id)
    }

    createRental() {
        
    }
}