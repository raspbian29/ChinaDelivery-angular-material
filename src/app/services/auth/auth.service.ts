import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const TOKEN_STORAGE_KEY = 'auth.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public http: HttpClient, public router: Router){}

  authenticate(email: string, password: string): Promise<any> {
    return this.http
      .post<{key}>('/rest/auth/token', {email, password})
      .toPromise()
      .then(token => {
        this.setTokenKey(token.key);
        this.router.navigate(['']);
      });
  }

  setTokenKey(token: string): void {
    !token
      ? localStorage.removeItem(TOKEN_STORAGE_KEY)
      : localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }

  getTokenKey(): string {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
}
