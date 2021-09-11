import { NotificationsService } from './../../services/notifications.service';
import { LoginService } from '../../services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent { 
  constructor(private loginService: LoginService,
              private router: Router,
              private notificationsService: NotificationsService) {}

  username='';
  password='';

  onLoginBtnPressed() {
    this.loginService.login(this.username, this.password)
    .then(() => {
      this.notificationsService.success();
      this.router.navigate(['/dashboard'])
    }).catch(err => this.notificationsService.error(err.statusText))
  }
}
