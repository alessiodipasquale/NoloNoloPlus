import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { UsersComponent } from './users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
    path:'',
    component: UsersComponent,
    children: [
    {
        path: 'main-users',
        component: MainUsersComponent,
    },
    {
        path: 'create-user',
        component: CreateUserComponent
    },
    {
        path: 'edit-user',
        component: EditUserComponent
    }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
