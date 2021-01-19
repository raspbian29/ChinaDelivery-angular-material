import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {ApiServiceGet} from '../api/ApiServiceGet';
import {BehaviorSubject} from 'rxjs';

const TOKEN_STORAGE_KEY = 'auth.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userBehavior: BehaviorSubject<User>;
  public loginBehavior: BehaviorSubject<boolean>;

  constructor(public http: HttpClient, public router: Router, private apiServiceGet: ApiServiceGet){
    this.userBehavior = new BehaviorSubject<User>(null);
    this.loginBehavior = new BehaviorSubject<boolean>(null);
  }

  buildUserProfile(): void {
    this.apiServiceGet.getUserInfo().toPromise().then(user => {
      this.userBehavior.next(user);
    });
  }

  authenticate(email: string, password: string): Promise<any> {
    return this.http
      .post<{key}>('/rest/auth/token', {email, password})
      .toPromise()
      .then(token => {
        this.setTokenKey(token.key);
        this.loginBehavior.next(true);
      })
      .catch(() => {
        this.loginBehavior.next(false);
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

  logout(): void{
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigate(['auth']);
  }
}
