import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/notifications.service';
import { UsersService } from './../../../services/users.service';
import { TokenService } from './../../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { decode } from 'querystring';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(private tokenService: TokenService,
              private usersService: UsersService,
              private notificationsService: NotificationsService,
              private router: Router) { }

  userId;
  user = {
    name:'',
    username :'',
    surname: '',
    address: ''
  };

  ngOnInit(): void {
      this.userId = this.tokenService.getDecodedToken().user._id;
      this.usersService.getUserById(this.userId)
      .then(user => {
        console.log(user);
        this.user = user
      });
  }

  editProfile() {
    this.usersService.editUser(this.user)
    .then(() => {
      this.notificationsService.success()
      this.router.navigate(['/pages/dashboard']);
    }).catch(err => this.notificationsService.error())
  }
}
