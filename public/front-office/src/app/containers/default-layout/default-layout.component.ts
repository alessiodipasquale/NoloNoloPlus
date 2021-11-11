import { Router } from '@angular/router';
import { blacklistedElements } from './../../_nav';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  constructor(private authService: AuthService,
              public tokenService: TokenService,
              private router: Router) {}

  public sidebarMinimized = false;
  public navItems = navItems;
  public blacklistedElements = blacklistedElements;

  ngOnInit() {
    console.log(this.navItems);
    if(!this.tokenService.isTokenSet()) {
      this.navItems.forEach((item, index )=> {

        this.blacklistedElements.forEach(name => {
          if (item.name === name) {
            this.navItems.splice(index)
          }
          

        })  
      })
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  doLogout() {
    this.authService.logout();
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
