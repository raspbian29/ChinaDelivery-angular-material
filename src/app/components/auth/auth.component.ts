import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public email: string;
  public password: string;
  public errors: string[] = [];
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.errors = [];
    this.authService.authenticate(this.email, this.password).catch((err) => {
      this.errors.push('' + err);
    });
  }
}
