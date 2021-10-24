import { KitSpecComponent } from './kit-spec/kit-spec.component';
import { KitsComponent } from './kits.component';
import { KitsRoutingModule } from './kits-routing.module';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'ngx-easy-table';

const components = [
  KitsComponent,
  KitSpecComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        KitsRoutingModule,
        TableModule
    ],
    declarations: [
        ...components,
    ]
})

export class KitsModule {}