import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/User';

@Injectable({providedIn: 'root'})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  save(user: User) {
    return this.http.post('/sign-in/register', user);
  }


}
