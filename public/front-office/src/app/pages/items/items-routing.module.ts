import { ItemSpecComponent } from './item-spec/item-spec.component';
import { ItemsComponent } from './items.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: ItemsComponent,
    children: [
    {
        path: 'item-spec',
        component: ItemSpecComponent,
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ItemsRoutingModule { }
