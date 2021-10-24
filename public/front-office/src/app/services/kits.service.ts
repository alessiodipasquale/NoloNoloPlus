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

    checkIfAvailable(startDate, endDate, kitId) {
        return this.http.post('/Kits/'+kitId+'/checkIfAvailable', {startDate, endDate, kitId})
    }

    deleteKit(id) {
        return this.http.delete('/Kits/'+id)
    }
}