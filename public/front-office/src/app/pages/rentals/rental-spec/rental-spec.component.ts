import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-rental-spec',
  templateUrl: './rental-spec.component.html',
  styleUrls: ['./rental-spec.component.scss']
})
export class RentalSpecComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router: Router) { }

  @ViewChild('reviewModal') public reviewModal: ModalDirective;


  rental;

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(map =>
      this.rental = window.history.state.rental
    )

    console.log(this.rental);

  }

  openReviewModal() {
    this.reviewModal.show()
  }

}
