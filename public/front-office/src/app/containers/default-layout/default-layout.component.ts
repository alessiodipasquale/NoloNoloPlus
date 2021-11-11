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
    /*if(!this.tokenService.isTokenSet()) {
      this.navItems.forEach((item, index )=> {
        this.blacklistedElements.forEach(name => {
          console.log(item.name + ' '+name)
          if (item.name === name) {
            this.navItems.splice(index, 1)
          }
        })  
      })
    }*/
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  doLogout() {
    this.authService.logout();
  }

  goLogin() {
    console.log('vado in login')
    this.router.navigate(['/login']);
  }
}
