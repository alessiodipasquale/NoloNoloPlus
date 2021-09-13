import { ItemsRoutingModule } from './items-routing.module';
import { MainItemsComponent } from './main-items/main-items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { ItemsComponent } from './items.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const components = [
  ItemsComponent,
  CreateItemComponent,
  EditItemComponent,
  MainItemsComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        ItemsRoutingModule,
    ],
    declarations: [
        ...components,
        MainItemsComponent,
        CreateItemComponent,
        EditItemComponent
    ]
})

export class ItemsModule {}