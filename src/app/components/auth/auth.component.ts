import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../models/User';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public email: string;
  public password: string;
  public errors;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.errors = [];
    this.authService.authenticate(this.email, this.password).catch((err) => {
      this.errors.push('' + err);
    });
    this.authService.userBehavior.subscribe(user => {
      this.router.navigate(['/']);
    });
  }
}
