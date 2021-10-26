import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RentalsRoutingModule } from './rentals-routing.module';
import { RentalsComponent } from './rentals.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'ngx-easy-table';
import { RentalsListComponent } from './rentals-list/rentals-list.component';

const components = [
    RentalsComponent,
    RentalsListComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        RentalsRoutingModule,
        TableModule,
        CarouselModule.forRoot()
    ],
    declarations: [
        ...components,
    ]
})

export class RentalsModule {}