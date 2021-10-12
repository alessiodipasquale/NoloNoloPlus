import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {}

  categories = [
    {
      name: "Auto"
    },
    {
      name: "Moto"
    },
    {
      name: "Appartamenti"
    },
    {
      name: "Bricolage"
    },
    {
      name: "Libri"
    },
    {
      name: "Macchine agricole"
    },
  ];
  selectedCategory = 0;

  items = [
    {
      id: 1,
      name: "Tesla Model 3",
      price: "120",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      id: 2,
      name: "Panda Nuova",
      price: "120",
      imgSrc: "https://cdn2.rcstatic.com/images/car_images/web/fiat/panda_lrg.jpg",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      id: 3,
      name: "Pandarmato",
      price: "120",
      imgSrc: "https://foto1.newsauto.it/wp-content/uploads/2019/11/fiat-panda-4x4-gianni-agnelli-10.jpg",
      properties: [
        "Tanti posti", "Elettrica ma non troppo","Manualissima","Chilometraggio infinito"
      ]
    }
  ]

  ngOnInit(): void {
    
  }

  openItemSpec(item) {
    this.router.navigate(['/pages/items','item-spec'], {state: {item: item}});
  }
}
