import { ItemsComponent } from './items.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { CreateItemComponent } from './create-item/create-item.component';
import { MainItemsComponent } from './main-items/main-items.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: ItemsComponent,
    children: [
    {
        path: 'main-items',
        component: MainItemsComponent,
    },
    {
        path: 'create-item',
        component: CreateItemComponent
    },
    {
        path:'edit-item',
        component: EditItemComponent
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ItemsRoutingModule { }
