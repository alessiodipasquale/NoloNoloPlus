import { KitsService } from './../../services/kits.service';
import { CategoriesService } from './../../services/categories.service';
import { ItemsService } from './../../services/items.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private itemsService: ItemsService,
              private categoriesService: CategoriesService,
              private kitsService: KitsService) {}

  categories = [];
  selectedCategory = null;
  allItems = true;
  items = [];
  areItems = true;
  kits;

  ngOnInit(): void {
    this.itemsService.getItems()
    .then(items => {
      console.log(items);
      this.items = items
    });

    this.categoriesService.getCategories()
    .then(categories => {
      //console.log(categories);
      this.categories = categories;
    })
  }

  openItemSpec(item) {
    this.router.navigate(['/pages/items','item-spec'], {state: {item: item}});
  }

  selectCategory(category, index) {
    this.areItems = true;
    this.allItems = false;
    console.log(index);
    this.selectedCategory = index;
    this.categoriesService.getItems(category._id)
    .then(items => {
      console.log(items);
      this.items = items;
    })
  }

  loadAllItems() {
    this.areItems = true;
    this.allItems = true;
    this.selectedCategory = null;
    this.itemsService.getItems()
    .then(items => {
      this.items = items;
    })
  }

  loadKits() {
    this.allItems = false;
    this.areItems = false;
    this.selectedCategory = null;
    this.kitsService.getKits()
    .then(kits => {
      console.log(kits);
      this.kits = kits;
    })
  }

  openKitSpec(kit) {
    this.router.navigate(['/pages/kits','kit-spec'], {state: {kit: kit}});
  }
}
