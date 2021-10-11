import { NotificationsService } from './../../services/notifications.service';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  constructor(private authService: AuthService,
              public router: Router,
              private notificationsService: NotificationsService) {}

  username='';
  password='';

  onLoginBtnPressed() {
    this.authService.login(this.username, this.password)
    .then(() => {
      this.router.navigate(['/pages','dashboard'])
    }).catch(err => this.notificationsService.error(err.statusText))
  }
}
