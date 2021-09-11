import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private jwtHelper: JwtHelperService) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getDecodedToken() {
    return this.jwtHelper.decodeToken(this.getToken());
  }

  isTokenSet(): boolean {
    if (this.getToken())
      return true;
    else return false;
  }
}
