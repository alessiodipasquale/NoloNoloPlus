import { AuthGuardService } from './../services/auth-guard.service';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './../views/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
    path: '',
    component: PagesComponent,
    children: [{
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
      path: 'items',
      loadChildren: () => import('./items/items.module').then(m => m.ItemsModule),
    },
    {
      path: 'kits',
      loadChildren: () => import('./kits/kits.module').then(m=> m.KitsModule),
    },
    {
      path: 'rentals',
      loadChildren: () => import('./rentals/rentals.module').then(m=> m.RentalsModule),
    },
    {
      path: 'profiles',
      loadChildren: () => import('./profiles/profiles.module').then(m => m.ProfilesModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PagesRoutingModule {
  }
  