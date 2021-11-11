import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableModule } from 'ngx-easy-table';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const components = [
    ProfilesComponent,
    EditProfileComponent
];

@NgModule({
    imports: [
        ModalModule,
        FormsModule,
        CommonModule,
        ProfilesRoutingModule,
        TableModule
    ],
    declarations: [
        ...components,
    ]
})

export class ProfilesModule {}