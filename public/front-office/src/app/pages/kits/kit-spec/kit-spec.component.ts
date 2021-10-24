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
              private notificationsService: NotificationsService) { }

  kit;
  checked = false;
  startDate;
  endDate;
  days;
  finalPrice;

  ngOnInit(): void {
     
    this.activatedRoute.paramMap.pipe(map =>
      this.kit = window.history.state.kit
    )
    console.log(this.kit);
  }

}
