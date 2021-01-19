import {Component, Injectable, Input, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {RegisterService} from '../../services/register/RegisterService';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Injectable({providedIn: 'root'})
export class RegisterComponent implements OnInit {

  public errors;
  public user = new User();

  constructor(private service: RegisterService, private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.auth.logout();
    this.router.navigate(['register']);
  }

  register(): void {
    this.errors = [];
    this.service.save(this.user).toPromise()
      .then(res => {
        this.router.navigate(['auth']);
      })
      .catch((response) => {
        this.errors.push('This email is not available');
      });
  }
}


