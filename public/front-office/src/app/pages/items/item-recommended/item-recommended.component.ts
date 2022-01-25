import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-recommended',
  templateUrl: './item-recommended.component.html',
  styleUrls: ['./item-recommended.component.scss']
})
export class ItemRecommendedComponent implements OnInit {

  items = [];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map =>
      this.items = window.history.state.items
    )

    if (this.items == undefined)
     this.router.navigate(['/pages/dashboard']);
    console.log(this.items);
  }

  openItemSpec(item) {
    this.router.navigate(['/pages/items','item-spec'], {state: {item: item}});
  }


  goDashboard() {
    this.router.navigate(['/pages/dashboard']);
  }
}
