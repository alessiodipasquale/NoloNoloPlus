import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  template: '<router-outlet></router-outlet>'
})
export class ItemsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
