import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-spec',
  templateUrl: './item-spec.component.html',
  styleUrls: ['./item-spec.component.scss']
})
export class ItemSpecComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute,
              public router:Router) { }

  item;
  checked = false;
  startDate;
  endDate;
  days;
  finalPrice;
  ngOnInit(): void {
    
    this.activatedRoute.paramMap.pipe(map =>
      this.item = window.history.state.item
    )

    console.log(this.item);
  }

  checkAvailability(){
    this.checked = true
    console.log(this.endDate);

    this.endDate = new Date(this.endDate);
    this.startDate = new Date(this.startDate);
    var Time = this.endDate.getTime() - this.startDate.getTime(); 
    this.days = Time / (1000 * 3600 * 24);
    console.log(this.days);
    this.finalPrice = this.item.price * this.days;
  }
}
