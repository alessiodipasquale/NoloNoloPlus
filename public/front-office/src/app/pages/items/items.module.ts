import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'ngx-easy-table';
import { ItemSpecComponent } from './item-spec/item-spec.component';

const components = [
  ItemsComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        ItemsRoutingModule,
        TableModule
    ],
    declarations: [
        ...components,
        ItemSpecComponent
    ]
})

export class ItemsModule {}