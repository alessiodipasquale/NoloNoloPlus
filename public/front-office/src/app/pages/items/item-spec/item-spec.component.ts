import { TokenService } from './../../../services/token.service';
import { RentalsService } from './../../../services/rentalsService.service';
import { ItemsService } from './../../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-item-spec',
  templateUrl: './item-spec.component.html',
  styleUrls: ['./item-spec.component.scss']
})
export class ItemSpecComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute,
              public router:Router,
              private notificationsService: NotificationsService,
              private itemsService: ItemsService,
              private rentalsService: RentalsService,
              public tokenService: TokenService) { }

  item;
  checked = false;
  startDate;
  endDate;
  days;
  finalPrice;
  reviews = [];
  receipt = [];
  ngOnInit(): void {
    
    this.activatedRoute.paramMap.pipe(map =>
      this.item = window.history.state.item
    )

    if (this.item == undefined)
     this.router.navigate(['/pages/dashboard']);

    this.itemsService.getReviewsByItemId(this.item._id)
    .then(reviews => {
      this.reviews = reviews;
      console.log(reviews)
    });
  }

  checkAvailability(){
    console.log(this.endDate);

    this.endDate = new Date(this.endDate)
    this.startDate = new Date(this.startDate)
    if(this.startDate.getTime() > this.endDate.getTime() || this.endDate.getTime() < this.startDate.getTime())
      this.notificationsService.error("Inserisci un periodo valido!")
    else {
      var Time = this.endDate.getTime() - this.startDate.getTime(); 
      if (Time === 0) {
        this.days = 1;
      } else {
        this.days = Time / (1000 * 3600 * 24);
      }
      //console.log(this.days);
      this.endDate = (this.endDate).toISOString().substring(0,10);;
      this.startDate = (this.startDate).toISOString().substring(0,10);
      //da aggiustare
      this.itemsService.checkIfAvailable(this.startDate,this.endDate,this.item._id)
      .then(() => {
        this.itemsService.calculatePrice(this.item._id, this.startDate,this.endDate)
        .then(res => {
          this.finalPrice = res.finalPrice;
          this.receipt = res.receipt;
          console.log(res);
        })
        this.checked = true
        this.finalPrice = this.item.standardPrice * this.days;
      }).catch(err => {
        this.notificationsService.error("Non c'è disponiiblità per il periodo richiesto")
      })
    }
    
  }

  rent(){
    this.rentalsService.createRental(this.startDate, this.endDate, this.item._id, this.days)
    .then(() => {
      this.itemsService.getRecommended(this.item._id)
      .then(items => {
        if (items == []) {
          this.router.navigate(['/pages/dashboard']);
        } else {
          this.router.navigate(['/pages/items/item-recommended'], {state: {items: items}});
        }
        this.notificationsService.success("Prenotazione riuscita con successo");
      });
      
    }).catch(err => this.notificationsService.error(err))
  }

  goLogin() {
    this.router.navigate(['/login'])
  }
}
