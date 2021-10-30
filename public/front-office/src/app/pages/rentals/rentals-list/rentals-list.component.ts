import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { TokenService } from './../../../services/token.service';
import { RentalsService } from './../../../services/rentalsService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentals-list',
  templateUrl: './rentals-list.component.html',
  styleUrls: ['./rentals-list.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true, showIndicators: true } }
  ]
})
export class RentalsListComponent implements OnInit {

  constructor(private rentalsService: RentalsService,
              private tokenService: TokenService,
              private router: Router) { }

  rentals;

  ngOnInit(): void {
    const userId = this.tokenService.getDecodedToken().user._id;
    console.log(userId)
    this.rentalsService.getUserRentals(userId)
    .then(rentals => {
      rentals.forEach(rental => {
        rental.startDate = new Date(rental.startDate).toLocaleDateString();
        rental.endDate = new Date(rental.endDate).toLocaleDateString();
      });
      this.rentals = rentals;
      console.log(rentals);
    })
  }

  openSpecRental(rental) {
    this.router.navigate(['/pages/rentals','rental-spec'], {state: {rental: rental}});
  }

}
