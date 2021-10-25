import { RentalsListComponent } from './rentals-list/rentals-list.component';
import { RentalsComponent } from './rentals.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: RentalsComponent,
    children: [
    {
        path: 'rentals-list',
        component: RentalsListComponent,
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RentalsRoutingModule { }
