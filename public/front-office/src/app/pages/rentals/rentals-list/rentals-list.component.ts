import { TokenService } from './../../../services/token.service';
import { RentalsService } from './../../../services/rentalsService.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentals-list',
  templateUrl: './rentals-list.component.html',
  styleUrls: ['./rentals-list.component.scss']
})
export class RentalsListComponent implements OnInit {

  constructor(private rentalsService: RentalsService,
              private tokenService: TokenService) { }

  rentals;

  ngOnInit(): void {
    const userId = this.tokenService.getDecodedToken().user._id;
    console.log(userId)
    this.rentalsService.getUserRentals(userId)
    .then(rentals => {
      this.rentals = rentals;
      console.log(rentals);
    })
   
  }

}
