import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainUsersComponent } from './main-users/main-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const components = [
    UsersComponent,
    MainUsersComponent,
    CreateUserComponent,
    EditUserComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [
        ...components,
    ]
})

export class UsersModule {}