import { TokenService } from './token.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService,
              private tokenService: TokenService,
              private router: Router) { }

  login(username, password): Promise<any> {
    const httpRequest: Promise<any> = this.http.post('/login', {username, password}, false);
    httpRequest.then((response: any) => {
      console.log(response)
      this.tokenService.setToken(response.token)});
    return httpRequest;
  }
  
  isAuthenticated(): boolean {
    return this.tokenService.isTokenSet();
  }

  logout() {
    this.tokenService.setToken('');
    this.router.navigate(['/login']);
  }
}