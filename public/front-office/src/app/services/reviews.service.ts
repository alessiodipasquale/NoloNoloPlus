import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

    constructor(public http: HttpService) { }

    publishReview(stars , comment, itemId) {
        return this.http.post('/reviews', {stars, comment, itemId});
    }

    deleteReview(id) {
        return this.http.delete('/reviews/'+id);
    }
}