import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  password= '';
  repeat= '';
  username= '';

  constructor(private authService: AuthService,
              private notificationsService: NotificationsService,
              public router: Router) {}

  register() {
    this.authService.register(this.username, this.password)
    .then(() => {
      this.notificationsService.success('Registrazione completata! Accedi');
      this.router.navigate(['/login']);
    }).catch(err => this.notificationsService.error(err));
  }
}
