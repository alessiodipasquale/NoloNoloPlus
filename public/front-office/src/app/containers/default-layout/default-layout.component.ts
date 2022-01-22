import { Router } from '@angular/router';
import { blacklistedElements } from './../../_nav';
import { TokenService } from './../../services/token.service';
import { AuthService } from './../../services/auth.service';
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService,
              public tokenService: TokenService,
              private router: Router) {}

  public sidebarMinimized = false;
  public navItems = [...navItems];
  public blacklistedElements = blacklistedElements;

  @HostListener('unloaded')


  ngOnInit() {
    this.navItems = [...navItems]
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

  ngOnDestroy() {
    //console.log('Items destroyed');

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
