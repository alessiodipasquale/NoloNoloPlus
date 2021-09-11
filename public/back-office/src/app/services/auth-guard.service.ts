import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const urlTree = state.url.split('/');
    const child = urlTree[1];
    const module_ = urlTree[2];
    console.log(child);
    if (child !== 'login' && !this.authService.isAuthenticated()) {
      if ( child === 'pages') {
        this.redirectToLogin()
      } 
      return false;
    } else return true;
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }


}
