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
        canActivate: [AuthGuardService]
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
  