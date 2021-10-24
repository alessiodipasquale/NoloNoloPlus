import { KitSpecComponent } from './kit-spec/kit-spec.component';
import { KitsComponent } from './kits.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: KitsComponent,
    children: [
    {
        path: 'kit-spec',
        component: KitSpecComponent,
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class KitsRoutingModule { }
