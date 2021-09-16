import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    constructor(public http: HttpService) { }

    getUsers() {
        return this.http.get('/users');
    }

    getUserById(id) {
        return this.http.get('/users/'+id);
    }

    deleteUser(id) {
        return this.http.delete('/users/'+id)
    }
}