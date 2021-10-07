import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

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
      name: "Tesla Model 3",
      price: "120$/giorno",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      name: "Tesla Model 3",
      price: "120$/giorno",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      name: "Tesla Model 3",
      price: "120$/giorno",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      name: "Tesla Model 3",
      price: "120$/giorno",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
    {
      name: "Tesla Model 3",
      price: "120$/giorno",
      imgSrc: "http://pngimg.com/uploads/tesla_car/tesla_car_PNG40.png",
      properties: [
        "5 posti", "Elettrica","Automatica","Chilometraggio illimitato"
      ]
    },
  ]

  ngOnInit(): void {
    
  }
}
