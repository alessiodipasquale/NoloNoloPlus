import { RentalsService } from './../../../services/rentalsService.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-rental-spec',
  templateUrl: './rental-spec.component.html',
  styleUrls: ['./rental-spec.component.scss']
})
export class RentalSpecComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router,
              private rentalsService: RentalsService,
              private notificationsService: NotificationsService) { }

  @ViewChild('reviewModal') public reviewModal: ModalDirective;


  rental;
  review = 3;
  reviewText;
  selectedItem = null;

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(map =>
      this.rental = window.history.state.rental
    )

    console.log(this.rental);

  }

  openReviewModal(item) {
    this.selectedItem = item;
    this.reviewModal.show()
  }

  sendReview() {
    this.rentalsService.publishReview(this.review, this.reviewText, this.selectedItem._id)
    .then(review => {
      let item = this.rental.items.filter(item => item._id = this.selectedItem._id);
      item[0].reviews.push(review);
      this.reviewModal.hide();
      this.notificationsService.success();
    })
  }

}
