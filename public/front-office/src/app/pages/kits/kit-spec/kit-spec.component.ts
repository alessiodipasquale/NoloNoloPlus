import { TokenService } from './../../../services/token.service';
import { KitsService } from './../../../services/kits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-kit-spec',
  templateUrl: './kit-spec.component.html',
  styleUrls: ['./kit-spec.component.scss']
})
export class KitSpecComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              public router:Router,
              private notificationsService: NotificationsService,
              private kitsService: KitsService,
              public tokenService: TokenService) { }

  kit;
  checked = false;
  startDate;
  endDate;
  days;
  finalPrice;
  kitReceipt;
  partialPrices;
  finalKitPrice;

  ngOnInit(): void {
     
    this.activatedRoute.paramMap.pipe(map =>
      this.kit = window.history.state.kit
    )

    if (this.kit == undefined)
     this.router.navigate(['/pages/dashboard']);

    console.log(this.kit);
  }

  checkAvailability() {
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
      const itemIds = this.kit.items.map(item => item._id);
      this.kitsService.checkIfAvailable(this.startDate,this.endDate,this.kit._id,itemIds)
      .then(() => {
        this.kitsService.calculatePrice(this.kit._id, this.startDate,this.endDate)
        .then(res => {
          this.kitReceipt = res.kitReceipt;
          this.partialPrices = res.partialPrices;
          this.finalKitPrice = res.finalKitPrice;
          console.log(res);
        })
        this.checked = true
        this.finalPrice = this.kit.standardPrice * this.days;
      }).catch(err => {        
        this.notificationsService.error("Non c'?? disponiiblit?? per il periodo richiesto")
      })
    }
  }

  rent(){
    const itemIds = this.kit.items.map(item => item._id);

    this.kitsService.createRental(this.startDate, this.endDate, this.days, itemIds, this.kit._id)
    .then(() => {
      this.router.navigate(['/pages/dashboard']);
      this.notificationsService.success("Prenotazione riuscita con successo");
    }).catch(err => this.notificationsService.error(err))
  }

  goLogin() {
    this.router.navigate(['/login'])
  }

}
