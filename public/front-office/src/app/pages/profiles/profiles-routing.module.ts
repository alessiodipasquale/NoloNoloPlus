import { EditProfileComponent } from './../profiles/edit-profile/edit-profile.component';
import { ProfilesComponent } from './profiles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: ProfilesComponent,
    children: [
    {
        path: 'edit-profile',
        component: EditProfileComponent,
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfilesRoutingModule { }
